const Order = require('../database/models/orderModel');
const PDFDocument = require('pdfkit');

const path = require('path');

const {
  ORDERS_NOT_FOUND,
  ORDER_NOT_FOUND,
  ORDER_STATUS_COULD_NOT_BE_UPDATED,
  ORDER_STATUS_UPDATED,
} = require('../messages');

async function getOrders(req, res) {
  try {
    const orders = await Order.find();

    if (!orders) return res.status(404).json({ message: ORDERS_NOT_FOUND });

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

async function updateOrderStatus(req, res) {
  const { id } = req.body;
  console.log(id);

  try {
    const order = await Order.updateOne(
      { _id: id },
      { status: 'Complete' }
    ).lean();

    if (!order)
      return res
        .status(404)
        .json({ message: ORDER_STATUS_COULD_NOT_BE_UPDATED });

    return res.status(200).json({ message: ORDER_STATUS_UPDATED });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getOrderReceipt(req, res) {
  const { id, type } = req.body;

  try {
    const order = await Order.findById(id).lean();

    if (!order) return res.status(404).json({ message: ORDER_NOT_FOUND });

    const cakesItems = order.items.filter(item => item.filter === 'Cakes');
    const nonCakesItems = order.items.filter(item => item.filter !== 'Cakes');

    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=receipt.pdf',
    });

    if (type === 'cakes') {
      buildReceipt(
        order,
        cakesItems,
        order.cakesDate,
        order.cakesTime,
        chunk => stream.write(chunk),
        () => {
          stream.end();
        }
      );
    }

    if (type === 'nonCakes') {
      buildReceipt(
        order,
        nonCakesItems,
        order.nonCakesDate,
        order.nonCakesTime,
        chunk => stream.write(chunk),
        () => {
          stream.end();
        }
      );
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

function buildReceipt(order, items, date, time, dataCallback, endDataCallback) {
  const elementGap = 0.1;
  const sectionGap = 0.5;
  const imagePath = path.join(__dirname, '../image/ndeys-kitchen.png');
  const size = 50;

  const height = 300 + 20 * items.length;

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

  receipt
    .text(`${date}`, { continued: true, align: 'left' })
    .text(`${time}`, { align: 'right' })
    .moveDown(sectionGap);

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

  items.map(item => {
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

module.exports = { getOrders, getOrderReceipt, updateOrderStatus };
