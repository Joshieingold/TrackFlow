import React from 'react';
import { MainNavbar } from "../../GeneralComponents/MainNavbar/mainNavbar.jsx";
import './orderStatistics.css'; // Import your CSS file for styling
import { OrdersNavbar } from './OrdersNavbar/ordersNavbar.jsx';

const OrderStatisticsPage = () => {
  return (
    <div className='order-statistics-page'>
      <MainNavbar />
      <OrdersNavbar/>
        <div className="two-bubble-container">
          <div className="bubble">hi</div>
          <div className="bubble">hi</div>
        </div>
        <div className='one-bubble-container'>
          <div className="bubble">hi</div>  
        </div>
      </div>
  );
}
export default OrderStatisticsPage;