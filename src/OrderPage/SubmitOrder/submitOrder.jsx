import { MainNavbar } from "../../GeneralComponents/MainNavbar/mainNavbar";
import { OrdersNavbar } from "../OrdersNavbar/ordersNavbar";
import {ManualPush } from "./Components/ManualPush/manualPush";
import React from "react";
import "./submitOrder.css";
const SubmitOrder = () => {
return (
    <div className="submit-main-container">
        <MainNavbar/>
        <OrdersNavbar/>
        <div className="onetothree-bubble-container">
            <div className="bubble small">
                <h3>Manual Submission</h3>
                <ManualPush/>
            </div>
            <div className="bubble big">
                <h3>Order Review</h3>
            </div>
        </div>
    </div>
)
}
export default SubmitOrder;

