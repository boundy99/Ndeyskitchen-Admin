import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import Headroom from 'react-headroom';

export default function OrderViewNabar({ filteredOrder, admin, id }) {
  const navigate = useNavigate();

  const hasCakeItems = filteredOrder[0].items.find(
    item => item.filter === 'Cakes'
  );

  const hasNonCakeItems = filteredOrder[0].items.find(
    item => item.filter !== 'Cakes'
  );

  async function handleReceiptClick(event, type) {
    event.preventDefault();

    try {
      const response = await fetch('/api/orders/get-order-receipt', {
        method: 'POST',
        body: JSON.stringify({ admin, id, type }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) return;

      const receiptBlob = await response.blob();
      const receipt = new Blob([receiptBlob], { type: 'application/pdf' });
      const receiptUrl = URL.createObjectURL(receipt);

      window.open(receiptUrl, '_blank');
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Headroom>
      <header>
        <nav className="order-view-navbar-container">
          <button onClick={() => navigate('/')} className="back-btn">
            Back
          </button>
          <div className="receipts-btn-container">
            {hasCakeItems && (
              <button onClick={event => handleReceiptClick(event, 'cakes')}>
                C Receipt
              </button>
            )}
            {hasNonCakeItems && (
              <button onClick={event => handleReceiptClick(event, 'nonCakes')}>
                N-C Receipt
              </button>
            )}
          </div>
        </nav>
      </header>
    </Headroom>
  );
}
