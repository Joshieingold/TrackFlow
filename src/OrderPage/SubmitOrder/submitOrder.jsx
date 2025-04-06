import { MainNavbar } from "../../GeneralComponents/MainNavbar/mainNavbar";
import { OrdersNavbar } from "../OrdersNavbar/ordersNavbar";
import { ManualPush } from "./Components/ManualPush/manualPush";
import React, { useEffect, useState } from "react";
import "./submitOrder.css";
import OrderReview from "./Components/OrderReview/orderReview";
import { fetchTechData, fetchTempOrdersData } from "../../GeneralComponents/Database/databaseFunctions";
import { Footer } from "../../GeneralComponents/Footer/footer";

const SubmitOrder = () => {
    const [techData, setTechData] = useState(null);
    const [orderData, setOrderData] = useState([]); // Default to an empty array
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const techDataResponse = await fetchTechData();
                const orderDataResponse = await fetchTempOrdersData();
                setTechData(techDataResponse);
                setOrderData(orderDataResponse || []); // Ensure orderData is always an array
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="submit-main-container">
            <MainNavbar />
            <OrdersNavbar />
            <div className="onetothree-bubble-container">
                <div className="bubble small">
                    <h3 className="title-text">Manual Submission</h3>
                    <ManualPush />
                </div>
                <div className="bubble big">
                    <h2 className="title-text">Order Review</h2>
                    {loading ? (
                        <p className="no-orders-text">Loading...</p>
                    ) : (
                        orderData.length === 0 ? (
                            <p className="no-orders-text">No orders to review!</p>  // Show this if orderData is empty
                        ) : (
                            <OrderReview techData={techData} TempDatabaseData={orderData} />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubmitOrder;
