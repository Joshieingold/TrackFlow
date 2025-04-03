import { endOfWeek, format, startOfWeek, eachDayOfInterval, isWithinInterval } from "date-fns";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase"; // Firestore instance


export const fetchOrdersData = async () => {
    try {
        const deliveryRef = collection(db, "DeliveryTracker");
        const querySnapshot = await getDocs(query(deliveryRef));
        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return;
        }
        let orderData = [];
        querySnapshot.forEach((doc) => {
            const order = doc.data();

            const boxes = order.Boxes || 1;
            const dateCompleted = order.DateCompleted && typeof order.DateCompleted.toDate === "function" 
                ? order.DateCompleted.toDate() 
                : new Date(); // Default to current date if not present
            const weight = order.Weight || 0;
            const location = order.Location || "Unknown";
            const orderNumber = order.ID || "Unknown";
            const skids = order.Skids || 1/24;
            const techName = order.TechName || "Unknown";
            const waybill = order.Waybill || "Unknown";
            const devices = order.Devices || {};

            orderData.push({
                Boxes: boxes || 1,
                Date: dateCompleted ? dateCompleted : new Date(),
                Weight: weight || 0,
                Location: location,
                OrderID: orderNumber || "Unknown",
                Skids: skids,
                Technician: techName || "Unknown",
                Waybill: waybill || "Unknown",
                Devices: devices || {},
            });
        });
        return orderData;
    }
    catch (error) {
        console.error("Error fetching orders data:", error);
    }
};
export const fetchTempOrdersData = async () => {
    try {
        const deliveryRef = collection(db, "TempDelivery");
        const querySnapshot = await getDocs(query(deliveryRef));
        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return;
        }
        let orderData = [];
        querySnapshot.forEach((doc) => {
            const order = doc.data();

            const boxes = order.Boxes || 1;
            const dateCompleted = order.DateCompleted && typeof order.DateCompleted.toDate === "function" 
                ? order.DateCompleted.toDate() 
                : new Date(); // Default to current date if not present
            const weight = order.Weight || 0;
            const location = order.Location || "Unknown";
            const orderNumber = order.ID || "Unknown";
            const skids = order.Skids || 1/24;
            const techName = order.TechName || "Unknown";
            const waybill = order.Waybill || "Unknown";
            const devices = order.Devices || {};

            orderData.push({
                Boxes: boxes || 1,
                Date: dateCompleted ? dateCompleted : new Date(),
                Weight: weight || 0,
                Location: location,
                OrderID: orderNumber || "Unknown",
                Skids: skids,
                Technician: techName || "Unknown",
                Waybill: waybill || "Unknown",
                Devices: devices || {},
            });
        });
        return orderData;
    }
    catch (error) {
        console.error("Error fetching orders data:", error);
    }
};
export const fetchTechData = async () => {
    try {
        const techRef = collection(db, "TechDatabase");
        const querySnapshot = await getDocs(query(techRef));
        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return;
        }
        let techData = [];
        querySnapshot.forEach((doc) => {
            const tech = doc.data();
            const techName = tech.Name || "Unknown";
            const location = tech.Location || "Unknown";
            const sendBy = tech.SendingMethod || "Purolator";
            

            techData.push({
                Name : techName || "Unknown",
                Location : location || "Unknown",
                SendingMethod : sendBy || "Purolator",
            });
        });
        return techData;
    }
    catch (error) {
        console.error("Error fetching orders data:", error);
    }
};
export const fetchDeviceData = async () => {
    try {
        const deviceRef = collection(db, "DeviceDatabase");
        const querySnapshot = await getDocs(query(deviceRef));
        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return;
        }
        let deviceData = [];
        querySnapshot.forEach((doc) => {
            const device = doc.data();
            const deviceName = device.Name || "Unknown";
            const fullBox = device.FullBox || 10;
            

            deviceData.push({
                Name : deviceName || "Unknown",
                FullBox : fullBox || 10,
            });
        });
        return deviceData;
    }
    catch (error) {
        console.error("Error fetching orders data:", error);
    }
};
