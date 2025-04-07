import { useState } from "react";
import "./reviewCard.css";
import { sendOrderData } from "../../../../GeneralComponents/Database/databaseFunctions";
import { doc, deleteDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../GeneralComponents/Database/firebase";

export const ReviewCard = ({
    orderId,
    name,
    location,
    waybill,
    devices,
    boxes,
    skids,
    date,
    onEdit,
    onRemove, // Callback to remove card from UI after deletion
}) => {
    const [editableOrder, setEditableOrder] = useState({
        orderId,
        name,
        location,
        waybill,
        devices,
        boxes,
        skids,
        date,
    });

    const handleChange = (e) => {
        console.log(editableOrder);
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

    const handleSend = async () => {
        const orderToSend = {
            OrderID: editableOrder.orderId,
            Technician: editableOrder.name,
            Location: editableOrder.location,
            Waybill: editableOrder.waybill,
            DateCompleted: new Date(editableOrder.date),
            Devices: editableOrder.devices,
            Boxes: Number(editableOrder.boxes),
            Skids: Number(editableOrder.skids),
            Weight: 0,
            
        };
    
        try {
            
    
            // Query the TempDelivery collection to find the document with the matching orderId
            const q = query(collection(db, "TempOrders"), where("OrderID", "==", editableOrder.orderId));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                // If we found the document, delete it
                const docRef = querySnapshot.docs[0].ref; // Get the reference to the document
                 // Send the order data first
                await sendOrderData(orderToSend);
                await deleteDoc(docRef);
                alert(`Order ${editableOrder.orderId} submitted and removed from TempDelivery!`);
    
                // Optional: Call onRemove callback to remove the card from the UI
                if (onRemove) onRemove(editableOrder.orderId);
            } else {
                alert("Order not found in TempDelivery.");
            }
        } catch (err) {
            console.error("Failed to send order:", err);
            alert("Error submitting order. Check console for details.");
        }
    };
    

    const handleRemove = async () => {
        const confirm = window.confirm("Are you sure you want to remove this order?");
        if (!confirm) return;

        try {
            // Query to find the document by orderId
            const q = query(
                collection(db, "TempOrders"), // Collection where orders are stored
                where("OrderID", "==", editableOrder.orderId) // Searching by orderId field
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // If document is found, delete it
                querySnapshot.forEach(async (docSnap) => {
                    await deleteDoc(doc(db, "TempOrders", docSnap.id)); // Using docSnap.id to delete the document
                    console.log(`Deleted document with orderId ${editableOrder.orderId}`);
                });

                alert(`Order ${editableOrder.orderId} removed from TempDelivery.`);
                if (onRemove) onRemove(editableOrder.orderId); // Trigger onRemove callback
            } else {
                console.warn("No document found with orderId:", editableOrder.orderId);
                alert("No matching order found for removal.");
            }
        } catch (err) {
            console.error("Failed to delete order:", err);
            alert("Error removing order. Check console for details.");
        }
    };

    return (
        <div className="review-card">
            <div className="review-header">
                <h2>
                    Order {editableOrder.orderId} -{" "}
                    {new Date(editableOrder.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                    })}
                </h2>
            </div>

            <div className="order-detail-container">
                <div className="text-detail-container">
                    <div className="input-text-container">
                        <p>Order ID:</p>
                        <input name="orderId" value={editableOrder.orderId} onChange={handleChange} />
                    </div>
                    <div className="input-text-container">
                        <p>Tech Name:</p>
                        <input name="name" value={editableOrder.name} onChange={handleChange} />
                    </div>
                    <div className="input-text-container">
                        <p>Order Location:</p>
                        <input name="location" value={editableOrder.location} onChange={handleChange} />
                    </div>
                    <div className="input-text-container">
                        <p>Waybill:</p>
                        <input name="waybill" value={editableOrder.waybill} onChange={handleChange} />
                    </div>
                    <div className="input-text-container">
                        <p>Date Completed:</p>
                        <input
                            type="date"
                            name="date"
                            value={new Date(editableOrder.date).toISOString().split("T")[0]}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="device-showcase-container">
                    <h3>Devices:</h3>
                    <div className="device-showcase">
                        {Object.entries(editableOrder.devices).map(([device, qty]) => (
                            <div className="device-input" key={device}>
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

            <div className="button-container">
                <button className="submit-button" onClick={handleRemove}>Remove</button>
                <button className="submit-button" onClick={handleSend}>Submit Order</button>
            </div>
        </div>
    );
};
