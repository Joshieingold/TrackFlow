import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../../GeneralComponents/Database/firebase"; // Ensure your Firebase config is imported
import "./manualPush.css";

export const ManualPush = ({ techData = [] }) => { // ✅ Default to empty array
    const initialFormData = {
        Boxes: "",
        DateCompleted: "",
        Location: "",
        OrderID: "",
        techname: "",
        Waybill: "",
        Devices: [{ name: "", quantity: "" }],
    };

    const [formData, setFormData] = useState(initialFormData);
    const [skids, setSkids] = useState(0);
    const [deviceOptions, setDeviceOptions] = useState([]);
    const [deviceFullBoxMap, setDeviceFullBoxMap] = useState({});

    // ✅ Ensure techData is valid before using .reduce()
    const techMap = (techData ?? []).reduce(
        (acc, tech) => ({ ...acc, [tech.Name]: tech.Location || "" }),
        {}
    );
    const techOptions = (techData ?? []).map((tech) => tech.Name);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const deviceRef = collection(db, "DeviceDatabase");
                const querySnapshot = await getDocs(deviceRef);
                const devices = {};
                const deviceNames = [];

                querySnapshot.docs.forEach((doc) => {
                    const data = doc.data();
                    devices[data.Name] = data.FullBox || 10;
                    deviceNames.push(data.Name);
                });

                setDeviceOptions(deviceNames);
                setDeviceFullBoxMap(devices);
            } catch (error) {
                console.error("Error fetching devices:", error);
            }
        };
        fetchDevices();
    }, []);

    useEffect(() => {
        const totalBoxFraction = (formData.Devices ?? []).reduce((sum, { name, quantity }) => {
            if (!name || !quantity) return sum; // ✅ Skip invalid devices
            const fullBox = deviceFullBoxMap[name] || 10;
            return sum + (quantity ? quantity / fullBox : 0);
        }, 0);

        setFormData((prev) => ({
            ...prev,
            Boxes: Math.ceil(totalBoxFraction),
        }));
    }, [formData.Devices, deviceFullBoxMap]);

    useEffect(() => {
        setSkids((parseFloat(formData.Boxes) || 0) / 24);
    }, [formData.Boxes]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTechChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            techname: value,
            Location: techMap[value] || formData.Location,
        });
    };

    const handleDeviceChange = (index, field, value) => {
        const updatedDevices = [...formData.Devices];
        updatedDevices[index][field] = value;
        setFormData({ ...formData, Devices: updatedDevices });
    };

    const addDevice = () => {
        setFormData({ ...formData, Devices: [...formData.Devices, { name: "", quantity: "" }] });
    };

    const removeDevice = (index) => {
        if (formData.Devices.length > 1) {
            setFormData({
                ...formData,
                Devices: formData.Devices.filter((_, i) => i !== index),
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Transform Devices array into a map
            const deviceMap = (formData.Devices ?? []).reduce((acc, { name, quantity }) => {
                if (!name || !quantity) return acc;
                acc[name] = Number(quantity); // Ensure quantity is a number
                return acc;
            }, {});
    
            // Prepare final form data with correct keys
            const formattedData = {
                TechName: formData.techname,
                Location: formData.Location,
                Waybill: formData.Waybill,
                DateCompleted: formData.DateCompleted,
                OrderID: formData.OrderID,
                Boxes: formData.Boxes,
                Skids: skids,
                Devices: deviceMap,
            };
    
            // Push to Firestore
            const docRef = await addDoc(collection(db, "TempDelivery"), formattedData);
    
            console.log("Form Submitted and Document added with ID:", docRef.id);
    
            // Reset form after submission
            setFormData(initialFormData);
            setSkids(0);
    
        } catch (error) {
            console.error("Error adding document:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label>
                    Tech Name:
                    <input
                        list="tech-options"
                        type="text"
                        name="TechName"
                        value={formData.techname}
                        onChange={handleTechChange}
                        className="input-field"
                    />
                    <datalist id="tech-options">
                        {techOptions.map((techName, idx) => (
                            <option key={idx} value={techName} />
                        ))}
                    </datalist>
                </label>
            </div>

            {[{ label: "Location", name: "Location", type: "text" },
              { label: "Waybill", name: "Waybill", type: "text" },
              { label: "Date Completed", name: "DateCompleted", type: "date" },
              { label: "Order ID", name: "OrderID", type: "text" },
              { label: "Boxes", name: "Boxes", type: "number" }].map(({ label, name, type }) => (
                <div className="form-group" key={name}>
                    <label>
                        {label}:
                        <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </label>
                </div>
            ))}

            <div className="devices-container">
                <p className="text-manual-push">Devices:</p>
                {formData.Devices.map((device, index) => (
                    <div key={index} className="device-entry">
                        <input
                            list={`device-options-${index}`}
                            type="text"
                            placeholder="Device Name"
                            value={device.name}
                            onChange={(e) => handleDeviceChange(index, "name", e.target.value)}
                            className="input-field"
                        />
                        <datalist id={`device-options-${index}`}>
                            {deviceOptions.map((deviceName, idx) => (
                                <option key={idx} value={deviceName} />
                            ))}
                        </datalist>
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={device.quantity}
                            onChange={(e) => handleDeviceChange(index, "quantity", Number(e.target.value) || 0)}
                            className="input-field"
                        />
                        <button
                            type="button"
                            onClick={() => removeDevice(index)}
                            className="remove-button"
                        >
                            -
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addDevice} className="add-button">
                    + Add Device
                </button>
            </div>

            <div className="skids-display">
                <strong>Skids:</strong> {skids}
            </div>
            <button type="submit" className="submit-button">
                Submit
            </button>
        </form>
    );
};
