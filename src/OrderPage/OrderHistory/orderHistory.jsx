import { MainNavbar } from "../../GeneralComponents/MainNavbar/mainNavbar";
import { OrdersNavbar } from "../OrdersNavbar/ordersNavbar";
import react from "react";
import { OrderTable } from "./Components/OrderTable/orderTable";
import React, { useEffect, useState } from 'react';
import { fetchOrdersData } from '../../GeneralComponents/Database/databaseFunctions.jsx';
import "./orderHistory.css"
const OrderHistory = () => {
    const [data, setData] = useState(null); // Store fetched data in state
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
        try {
            const ordersData = await fetchOrdersData(); // Wait for data
            setData(ordersData);
        } catch (error) {
            console.error("Error fetching data:", error); // Handle errors
        } finally {
            setLoading(false); // Stop loading once done
        }
        };

        fetchData();
    }, []);

    return (
    <div className="order-history-page">
        <MainNavbar/>
        <OrdersNavbar/>
        <div className="one-bubble-container">
            <div className="bubble">
                <h1>Order History</h1>
                <OrderTable data={data}/>
            </div>
        </div>
        
    </div>
    )
}
export default OrderHistory;