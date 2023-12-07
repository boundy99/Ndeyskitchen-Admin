import { useState, useEffect } from 'react';

export default function useFetchedOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getOrders() {
      const response = await fetch('/api/orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) console.log(json.message);

      setOrders(json);
      setIsLoading(false);
    }
    getOrders();
  }, []);
  return { orders, isLoading };
}
