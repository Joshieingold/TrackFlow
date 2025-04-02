import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../GeneralComponents/Database/firebase"; // Ensure your Firebase config is imported
import "./manualPush.css";

export const ManualPush = ({ techData = [] }) => { // ✅ Default to empty array
    const initialFormData = {
        Boxes: "",
        DateCompleted: "",
        Location: "",
        OrderID: "",
        techname: "",
        waybill: "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", { ...formData, Skids: skids });
        setFormData(initialFormData);
        setSkids(0);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <label>
                Tech Name:
                <input list="tech-options" type="text" name="techname" value={formData.techname} onChange={handleTechChange} className="input-field" />
                <datalist id="tech-options">
                    {techOptions.map((techName, idx) => (
                        <option key={idx} value={techName} />
                    ))}
                </datalist>
            </label>
            {[
                { label: "Location", name: "Location", type: "text" },
                { label: "Waybill", name: "waybill", type: "text" },
                { label: "Date Completed", name: "DateCompleted", type: "date" },
                
                { label: "Order ID", name: "OrderID", type: "text" },
                
                { label: "Boxes", name: "Boxes", type: "number" }
            ].map(({ label, name, type }) => (
                <label key={name}>
                    {label}:
                    <input type={type} name={name} value={formData[name]} onChange={handleChange} className="input-field" />
                </label>
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
                        <button type="button" onClick={() => removeDevice(index)} className="remove-button">
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
