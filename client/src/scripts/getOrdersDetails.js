import getDate from './getDate';
import useFetchedOrders from '../hooks/useFetchedOrders';

export default function getOrdersDetails() {
  const { orders } = useFetchedOrders();

  const { currentDate, currentMonth, year } = getDate;

  const ordersForCurrentDay = orders.filter(order => {
    const orderDate = new Date(order.createdAt);

    return (
      orderDate.getDate() === currentDate &&
      orderDate.getMonth() === currentMonth &&
      orderDate.getFullYear() === year
    );
  });

  const ordersForCurrentMonth = orders.filter(order => {
    const orderDate = new Date(order.createdAt);

    return (
      orderDate.getMonth() === currentMonth && orderDate.getFullYear() === year
    );
  });

  const ordersForCurrentYear = orders.filter(order => {
    const orderDate = new Date(order.createdAt);

    return orderDate.getFullYear() === year;
  });

  const currentDayEarnings = ordersForCurrentDay.reduce(
    (accumulator, order) =>
      order.status === 'Complete'
        ? accumulator + parseInt(order.total, 10)
        : accumulator,
    0
  );

  const currentMonthEarnings = ordersForCurrentMonth.reduce(
    (accumulator, order) =>
      order.status === 'Complete'
        ? accumulator + parseInt(order.total, 10)
        : accumulator,
    0
  );

  const currentYearEarnings = ordersForCurrentYear.reduce(
    (accumulator, order) =>
      order.status === 'Complete'
        ? accumulator + parseInt(order.total, 10)
        : accumulator,
    0
  );

  return {
    currentDayEarnings,
    currentMonthEarnings,
    currentYearEarnings,
    ordersForCurrentDay,
    ordersForCurrentMonth,
    ordersForCurrentYear,
  };
}
