import React from 'react';
import Loader from '../components/Loader';
import useFetchedOrders from '../../hooks/useFetchedOrders';

export default function Boilerplate() {
  const { orders, isLoading } = useFetchedOrders();

  return isLoading ? <Loader /> : <div className="home">Home</div>;
}
