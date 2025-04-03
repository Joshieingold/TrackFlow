import { MainNavbar } from "../../GeneralComponents/MainNavbar/mainNavbar";
import { OrdersNavbar } from "../OrdersNavbar/ordersNavbar";
import { ManualPush } from "./Components/ManualPush/manualPush";
import React, { useEffect, useState } from "react";
import "./submitOrder.css";
import OrderReview from "./Components/OrderReview/orderReview";
import { fetchTechData, fetchTempOrdersData } from "../../GeneralComponents/Database/databaseFunctions";

const SubmitOrder = () => {
    const [techData, setTechData] = useState(null);
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const techDataResponse = await fetchTechData();
                const orderDataResponse = await fetchTempOrdersData();
                setTechData(techDataResponse);
                setOrderData(orderDataResponse);
            } catch (error) {
                console.error("Error fetching data:", error);
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
                    <h3>Manual Submission</h3>
                    <ManualPush />
                </div>
                <div className="bubble big">
                    <h3>Order Review</h3>
                    {techData && orderData ? (
                        <OrderReview techData={techData} TempDatabaseData={orderData} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubmitOrder;

