import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import OrderViewNabar from '../components/order-view/orderViewNavbar';
import OrderViewContent from '../components/order-view/OrderViewContent';
import useAuthContext from '../hooks/useAuthContext';
import useFetchedOrders from '../hooks/useFetchedOrders';

export default function OrderView() {
  const { id } = useParams();
  const { admin } = useAuthContext();
  const { orders, isLoading } = useFetchedOrders();

  const filteredOrder = orders.filter(order => order._id === id);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <OrderViewNabar filteredOrder={filteredOrder} admin={admin} />
      <OrderViewContent filteredOrder={filteredOrder} admin={admin} />
    </>
  );
}
