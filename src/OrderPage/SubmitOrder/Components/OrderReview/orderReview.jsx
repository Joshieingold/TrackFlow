import React, { useState, useEffect } from "react";

const OrderReview = ({ TempDatabaseData, techData }) => {
    const [orders, setOrders] = useState([]);
    const [techMap, setTechMap] = useState({}); // To store tech names and their locations
    const [techNames, setTechNames] = useState([]); // To store tech names for auto-fill

    useEffect(() => {
        // Process techData to populate techMap and techNames
        const techs = {};
        const names = [];
        techData.forEach((tech) => {
            const name = tech.Technician|| "Unknown";
            const location = tech.Location || "Unknown";
            techs[name] = location;
            names.push(name);
        });
        setTechMap(techs);
        setTechNames(names);

        // Set orders from TempDatabaseData
        setOrders(TempDatabaseData);
    }, [TempDatabaseData, techData]);

    return (
        <div>
            {orders.map((order, index) => (
                <div key={index}>
                    <p>Order ID: {order.id}</p>
                    <p>Tech Name: {order.Technician}</p>
                    <p>Location: {order.Location}</p>
                    {/* Add more fields as needed */}
                </div>
            ))}
        </div>
    );
};
export default OrderReview;