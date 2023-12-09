import React from 'react';

export default function OrderCard({ filteredOrders }) {
  return (
    <div className="order-card-container">
      {filteredOrders.map(order => (
        <div key={order._id} className="order-card">
          <div className="information">
            <p className="order-number">#{order.orderNumber}</p>
            <p className="customer-name">{`${order.firstName} ${order.lastName}`}</p>
          </div>

          <button>View</button>
        </div>
      ))}
    </div>
  );
}
