import React, { useEffect, useState } from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import "./OrdersTreeMap.css";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const { name, totalWeight, size } = payload[0].payload;

  return (
    <div className="tooltip-container">
      <p>{`Waybill: ${name}`}</p>
      <p>{`Total Weight: ${totalWeight} kg`}</p>
      <p>{`Associated Boxes: ${size}`}</p>
    </div>
  );
};

const categorizeWaybill = (name) => {
  if (name?.startsWith("STJ")) return "Day&Ross Shipments";
  if (/^\d+$/.test(name)) return "Purolator Shipments";
  if (name?.includes("Pickup")) return "Pickup Orders";
  return "Pickup Orders"; // Default category
};

const getColor = (category) => {
  const colorMap = {
    "Day&Ross Shipments": "rgba(230, 124, 25, 0.83)", // Orange
    "Purolator Shipments": "rgba(31, 181, 201, 0.83)", // Blue
    "Pickup Orders": "rgba(212, 24, 56, 0.83)", // Red
    Other: "#00C49F", // Green
  };
  return colorMap[category] || "#000000";
};

const WaybillTreemap = ({ data }) => {
  const [treemapData, setTreemapData] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.warn("No valid data received");
      setLoading(false);
      return;
    }

    let waybillData = {};

    // Fixed iteration: Access properties directly
    data.forEach((document) => {
      const waybill = document.Waybill || "Unknown";
      const weight = document.Weight || 0;
      const boxes = document.Boxes || 1;

      if (!waybillData[waybill]) {
        waybillData[waybill] = { totalWeight: 0, totalBoxes: 0 };
      }

      waybillData[waybill].totalWeight += weight;
      waybillData[waybill].totalBoxes += boxes;
    });

    const formattedTreemapData = Object.keys(waybillData).map((waybill) => ({
      name: waybill,
      size: waybillData[waybill].totalBoxes, // Using Boxes as size
      totalWeight: waybillData[waybill].totalWeight, // Display weight in tooltip
    }));

    const groupedData = data.reduce((acc, item) => {
      const category = categorizeWaybill(item.Waybill);
      if (!acc[category]) acc[category] = [];
      acc[category].push({
        name: item.Waybill,
        size: item.Boxes || 1,
        totalWeight: item.Weight || 0,
        fill: getColor(category),
      });
      return acc;
    }, {});

    const totalBoxes = data.reduce((sum, item) => sum + (item.Boxes || 1), 0);
    const stats = Object.keys(groupedData).map((category) => {
      const categoryBoxes = groupedData[category].reduce((sum, item) => sum + item.size, 0);
      return {
        name: category,
        percentage: ((categoryBoxes / totalBoxes) * 100).toFixed(2),
        totalBoxes: categoryBoxes,
      };
    });

    const structuredTreemapData = {
      name: "Waybills",
      children: Object.keys(groupedData).map((category) => ({
        name: category,
        children: groupedData[category],
      })),
    };

    console.log("Grouped Treemap Data: ", structuredTreemapData);
    setTreemapData(structuredTreemapData);
    setCategoryStats(stats);
    setLoading(false);
  }, [data]);

  return (
    <div className="data-container">
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <ResponsiveContainer className="tree">
            <Treemap data={treemapData.children} dataKey="size" stroke="#fff" fill="rgba(255, 255, 255, 0)">
              <Tooltip content={<CustomTooltip />} />
            </Treemap>
          </ResponsiveContainer>
          <div className="bubble-container-stats">
            {categoryStats.map((stat) => (
              <div className="bubble-baby" key={stat.name}>
                <h3>{stat.name}</h3>
                <div>
                  <p>{stat.percentage}% of orders</p>
                  <p>{stat.totalBoxes} Boxes Sent</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WaybillTreemap;
