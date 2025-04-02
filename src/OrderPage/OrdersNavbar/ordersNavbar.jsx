import "./ordersNavbar.css";
import React from "react";
import { Link } from "react-router-dom";
const OrdersNavbar = () => {
    return (
        <div className="menu-content orders-navbar">
            <Link className="menu-item">Order Statistics</Link>
            <Link className="menu-item">Submit Order</Link>
            <Link className="menu-item">Order History</Link>
            <Link className="menu-item">Order Tracking</Link>
        </div>
    );
}
export { OrdersNavbar };