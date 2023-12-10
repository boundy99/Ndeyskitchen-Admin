const Order = require('../database/models/orderModel');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const sendEmail = require('../scripts/sendEmail');

const { ORDERS_NOT_FOUND, ORDER_NOT_FOUND } = require('../messages');

async function getOrders(req, res) {
  try {
    const orders = await Order.find();

    if (!orders) return res.status(404).json({ message: ORDERS_NOT_FOUND });

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

async function getOrderReceipt(req, res) {
  const { id } = req.body;

  try {
    const order = await Order.findById(id).lean();

    if (!order) return res.status(404).json({ message: ORDER_NOT_FOUND });

    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=receipt.pdf',
    });

    buildReceipt(
      order,
      chunk => stream.write(chunk),
      () => {
        stream.end();
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

function buildReceipt(order, dataCallback, endDataCallback) {
  const elementGap = 0.1;
  const sectionGap = 0.5;
  const imagePath = path.join(__dirname, '../image/ndeys-kitchen.png');
  const size = 50;

  const height = 285 + 60 * order.items.length;

  const receipt = new PDFDocument({
    size: [250, height],
    margin: 10,
  });

  receipt.on('data', dataCallback);
  receipt.on('end', endDataCallback);

  const xPosition = (receipt.page.width - size) / 2;

  receipt
    .image(imagePath, {
      fit: [size, size],
      align: 'center',
      x: xPosition,
    })
    .moveDown(sectionGap);

  receipt.font('Helvetica').fontSize(11);

  receipt.text(`Ndey's Kitchen`, { align: 'center' });

  receipt.moveDown(sectionGap);
  receipt
    .font('Helvetica-Bold')
    .fontSize(13)
    .text(`Order #${order.orderNumber}`, { align: 'center' });

  receipt.font('Helvetica').fontSize(11);

  receipt
    .moveDown(sectionGap)
    .text(`${order.firstName} ${order.lastName}`)
    .moveDown(elementGap)
    .text(`${order.countryCode}${order.number}`)
    .moveDown(elementGap)
    .text(`${order.residence}`)
    .moveDown(sectionGap * 2);

  if (order.cakesDate && order.cakesTime) {
    receipt
      .text(`${order.cakesDate}`, { continued: true, align: 'left' })
      .text(`${order.cakesTime}`, { align: 'right' })
      .moveDown(sectionGap);
  }

  receipt
    .moveDown(sectionGap * 2)
    .moveTo(10, receipt.y)
    .lineTo(receipt.page.width - 10, receipt.y)
    .stroke();

  receipt
    .moveDown(sectionGap)
    .text('Qty', { continued: true, align: 'left' })
    .text('Item', { continued: true, align: 'center' })
    .text('Price', { align: 'right' })
    .moveDown(sectionGap);

  order.items.map(item => {
    receipt
      .moveDown(elementGap)
      .text(item.quantity, { continued: true, align: 'left' })
      .text(item.name, { continued: true, align: 'center' })
      .text(`D ${item.price}`, { align: 'right' })
      .moveDown(sectionGap);
  });

  receipt
    .moveDown(sectionGap)
    .moveTo(10, receipt.y)
    .lineTo(receipt.page.width - 10, receipt.y)
    .stroke();

  receipt
    .moveDown(sectionGap * 2)
    .text('Total', { continued: true, align: 'left' })
    .text(`D ${order.total}`, { align: 'right' });

  receipt
    .moveDown(sectionGap * 3)
    .text(`Ndey's Kitchen thanks you`, { align: 'center' });

  receipt.end();
}

module.exports = { getOrders, getOrderReceipt };
