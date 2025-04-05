import React from "react";
import "./mainNavbar.css";
import { Link } from "react-router-dom";
import { FullLogo } from "./Components/logo.jsx";
const MainNavbar = () => {
    return (
        <div className="navbar">
           <FullLogo/> 
            <div className="menu-content">
                <Link to="/Home" className="menu-item">Home</Link>
                <Link to="/OrderStatistics" className="menu-item">Orders</Link>
                <Link to="/ContractorOverview" className="menu-item">Contractors</Link>
                <Link to="/Logout" className="menu-item">Logout</Link> 
            </div>
        </div>
    ); 
};

export { MainNavbar };
