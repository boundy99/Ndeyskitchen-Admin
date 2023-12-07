import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthContext from '../hooks/useAuthContext';

export default function useFetchedOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { admin, dispatch } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function getOrders() {
      const response = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({ admin }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) console.log(json.message);

      if (
        json.Message === 'Token expired' ||
        json.Message === 'Admin not found'
      ) {
        localStorage.removeItem('admin_token');
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
      }

      setOrders(json);
      setIsLoading(false);
    }
    getOrders();
  }, []);
  return { orders, isLoading };
}
