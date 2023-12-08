import React from 'react';
import Loader from '../components/Loader';
import Navbar from '../components/dashboard/Navbar';
import useFetchedOrders from '../hooks/useFetchedOrders';

export default function Home() {
  const { isLoading } = useFetchedOrders();

  return isLoading ? (
    <Loader />
  ) : (
    <div className="dashboard">
      <header>
        <Navbar />
      </header>
    </div>
  );
}
