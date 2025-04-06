import React, { useState, useEffect } from "react";
import { ReviewCard } from "../ReviewCard/reviewCard";
import "./orderReview.css";

const OrderReview = ({ TempDatabaseData, techData }) => {
    const [orders, setOrders] = useState([]);
    const [techMap, setTechMap] = useState({}); // To store tech names and their locations
    const [techNames, setTechNames] = useState([]); // To store tech names for auto-fill

    useEffect(() => {
        // Process techData to populate techMap and techNames
        const techs = {};
        const names = [];
        techData.forEach((tech) => {
            const name = tech.Technician || "Unknown";
            const location = tech.Location || "Unknown";
            techs[name] = location;
            names.push(name);
        });
        setTechMap(techs);
        setTechNames(names);

        // Set orders from TempDatabaseData
        setOrders(TempDatabaseData);
        
    }, [TempDatabaseData, techData]);

    const handleEdit = (index, updatedOrder) => {
        setOrders((prevOrders) => {
            const newOrders = [...prevOrders];
            newOrders[index] = updatedOrder;
            return newOrders;
        });
    };

    return (
        <div className="order-review-container">
            {orders.map((order, index) => (
                <ReviewCard
                    key={index}
                    orderId={order.OrderID}
                    name={order.Technician}
                    location={order.Location}
                    waybill={order.Waybill || "N/A"}
                    devices={order.Devices || {}}
                    boxes={order.Boxes || 0}
                    skids={order.Skids || 0}
                    date={order.date || Date()}
                    onEdit={() => {
                        const updatedOrder = { ...order, name: prompt("Edit Name", order.Technician) || order.Technician };
                        handleEdit(index, updatedOrder);
                    }}
                />
            ))}
            
        </div>
    );
};

export default OrderReview;

