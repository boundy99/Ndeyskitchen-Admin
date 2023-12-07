import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import useFetchedOrders from '../hooks/useFetchedOrders';
import useAuthContext from '../hooks/useAuthContext';

export default function Boilerplate() {
  const { orders, isLoading } = useFetchedOrders();
  const { admin, dispatch } = useAuthContext();
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem('admin_token');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="home">
      <button onClick={handleClick}>LOGOUT</button>
    </div>
  );
}
