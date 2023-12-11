import { React } from 'react';

export default function OrderViewContent({ filteredOrder, id }) {
  async function handleClick() {
    try {
      const response = await fetch('/api/orders/update-order-status', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.response();

      if (!response.ok) {
        console.log(json.message);
        return;
      }

      console.log(json.message);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="order-view-content-container">
      <div className="order-information">
        <h3>
          Order Status: <span>{filteredOrder[0].status}</span>
        </h3>

        <p>
          Payment Method: <span>{filteredOrder[0].paymentMethod}</span>
        </p>
        <p>
          Service: <span>{filteredOrder[0].service}</span>
        </p>

        {filteredOrder[0].cakesDate && filteredOrder[0].cakesTime && (
          <p>
            Cake items date and time :{' '}
            <span>
              {filteredOrder[0].cakesDate}, {filteredOrder[0].cakesTime}
            </span>
          </p>
        )}

        {filteredOrder[0].nonCakesDate && filteredOrder[0].nonCakesTime && (
          <p>
            Non Cake items date and time :{' '}
            <span>
              {filteredOrder[0].nonCakesDate}, {filteredOrder[0].nonCakesTime}
            </span>
          </p>
        )}

        <p>
          Total: <span>{`D ${filteredOrder[0].total}`}</span>
        </p>
      </div>

      <div className="items-card-container">
        {filteredOrder[0].items.map(item => (
          <div key={item._id} className="item-card">
            <img src={`/images/${item.image}`} />

            <div className="item-information">
              <p>{item.name}</p>
              {item.flavor !== '' && (
                <p>
                  {item.filter === 'Cakes' ? 'Flavor' : 'Protein'}:{' '}
                  {item.flavor}
                </p>
              )}

              <p>Size: {item.size}</p>
              <p>Quantity x price: {`${item.quantity} x ${item.price}`} </p>
            </div>
          </div>
        ))}
      </div>

      {filteredOrder[0].status === 'Not Complete' && (
        <button onClick={handleClick}>Complete</button>
      )}
    </div>
  );
}
