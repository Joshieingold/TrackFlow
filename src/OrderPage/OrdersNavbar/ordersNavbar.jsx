import "./ordersNavbar.css";
import React from "react";
import { Link } from "react-router-dom";
const OrdersNavbar = () => {
    return (
        <div className="menu-content orders-navbar">
            <Link to="/OrderStatistics" className="menu-item">Order Statistics</Link>
            <Link to="/SubmitOrder" className="menu-item">Submit Orders</Link>
            <Link className="menu-item">Order History</Link>
        </div>
    );
}
export { OrdersNavbar };