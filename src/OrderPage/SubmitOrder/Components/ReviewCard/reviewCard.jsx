import { useState } from "react";
import "./reviewCard.css";
export const ReviewCard = ({ orderId, name, location, waybill, devices, boxes, skids, onEdit }) => {
    const [editableOrder, setEditableOrder] = useState({
        orderId,
        name,
        location,
        waybill,
        devices,
        boxes,
        skids,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableOrder((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDeviceChange = (device, value) => {
        setEditableOrder((prev) => ({
            ...prev,
            devices: {
                ...prev.devices,
                [device]: value,
            },
        }));
    };

    return (
        <div className="review-card">
            <div className="order-detail-container">
                <div className="text-detail-container">
                    <div className="input-text-container">
                    <p>OrderID: {editableOrder.orderId}</p>
                    <input name="orderId" value ={editableOrder.orderId} onChange={handleChange} />
                    </div>
                    <div className="input-text-container">
                        <p>Tech Name:</p>
                        <input name="name" value={editableOrder.name} onChange={handleChange} />
                    </div>
                    <div className="input-text-container">
                        <p>Order Location</p>
                        <input name="location" value={editableOrder.location} onChange={handleChange} />
                    </div>
                    <div className="input-text-container">
                        <p>Waybill:</p>
                        <input name="waybill" value={editableOrder.waybill} onChange={handleChange} />
                    </div>
                </div>
                <div className="device-showcase-container">
                    <h3>Devices:</h3>
                    <div className="device-showcase">
                        {Object.entries(editableOrder.devices).map(([device, qty]) => (
                            <div key={device}>
                                <span>{device}: </span>
                                <input
                                    type="number"
                                    value={qty}
                                    onChange={(e) => handleDeviceChange(device, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="box-skid-container">
                        <div className="input-text-container">
                            <p>Boxes:</p>
                            <input name="boxes" type="number" value={editableOrder.boxes} onChange={handleChange} />
                        </div>
                        <div className="input-text-container">
                            <p>Skids:</p>
                            <input name="skids" type="number" value={editableOrder.skids} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
};
