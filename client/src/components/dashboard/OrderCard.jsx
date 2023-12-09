import React from 'react';
import { useNavigate } from 'react-router-dom';
import truncateText from '../../scripts/truncateText';

export default function OrderCard({ filteredOrders }) {
  const navigate = useNavigate();

  return (
    <div className="order-card-container">
      {filteredOrders.map(order => (
        <div key={order._id} className="order-card">
          <div className="information">
            <p className="order-number">#{order.orderNumber}</p>
            <p className="customer-name">
              {truncateText(`${order.firstName} ${order.lastName}`, 14)}
            </p>
          </div>

          <button onClick={() => navigate(`/order/${order._id}`)}>View</button>
        </div>
      ))}
    </div>
  );
}
