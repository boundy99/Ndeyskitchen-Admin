import React from 'react';
import getDate from '../../scripts/getDate';
import getOrdersDetails from '../../scripts/getOrdersDetails';

export default function Earnings() {
  const { day, month, year } = getDate;

  const { currentDayEarnings, currentMonthEarnings, currentYearEarnings } =
    getOrdersDetails();

  return (
    <div className="earnings-container">
      <h1>Earnings</h1>

      <div className="earnings-content">
        <table>
          <thead>
            <tr>
              <th>{day}</th>
              <th>{month}</th>
              <th>{year}</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>D {currentDayEarnings}</td>
              <td>D {currentMonthEarnings}</td>
              <td>D {currentYearEarnings}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
