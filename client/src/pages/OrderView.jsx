import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import OrderViewNabar from '../components/order-view/orderViewNavbar';
import useAuthContext from '../hooks/useAuthContext';
import useFetchedOrders from '../hooks/useFetchedOrders';

export default function OrderView() {
  const { id } = useParams();
  const { admin } = useAuthContext();
  const { orders, isLoading } = useFetchedOrders();

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <OrderViewNabar orders={orders} admin={admin} id={id} />
    </>
  );
}
