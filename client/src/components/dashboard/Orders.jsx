import { React, useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import useFetchedOrders from '../../hooks/useFetchedOrders';

export default function Orders() {
  const [button, setButton] = useState('Not Complete');
  const [search, setSearch] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  const { orders } = useFetchedOrders();

  const buttonStyle = {
    backgroundColor: '#fdfefe',
    color: '#371821',
    borderColor: '#371821',
  };

  useEffect(() => {
    const filtered = orders?.filter(
      order =>
        order.status === button &&
        (search === '' || order.orderNumber.includes(search))
    );

    setFilteredOrders(filtered);
  }, [orders, button, search]);

  function handleButtonClick(name) {
    setButton(name);
  }

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      <div className="status-btn">
        <button
          style={button === 'Not Complete' ? buttonStyle : {}}
          onClick={() => handleButtonClick('Not Complete')}
        >
          Not Complete
        </button>
        <button
          style={button === 'Complete' ? buttonStyle : {}}
          onClick={() => handleButtonClick('Complete')}
        >
          Complete
        </button>
      </div>

      <div className="orders-amount-and-input">
        <p>
          {filteredOrders.length > 0
            ? `Orders amount: ${filteredOrders.length}`
            : 'No result found'}
        </p>

        {button === 'Complete' && (
          <input
            type="text"
            inputMode="numeric"
            placeholder="Order #"
            onChange={event => setSearch(event.target.value)}
          />
        )}
      </div>
      <OrderCard filteredOrders={filteredOrders} />
    </div>
  );
}
