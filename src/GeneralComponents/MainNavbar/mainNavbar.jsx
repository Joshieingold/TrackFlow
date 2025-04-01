import React from "react";
import "./mainNavbar.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
const MainNavbar = () => {
    return (
        <div className="navbar">
            <div className="logo-content">
                <div className="icon-container">
                    <img className="icon" src={Logo} alt="Logo" />
                </div>
                <h2 className="logo-text">Rogers TrackFlow</h2>
            </div>
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
