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
  const [startDate, setStartDate] = useState(""); // Format: yyyy-mm-dd
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.warn("No valid data received");
      setLoading(false);
      return;
    }

    // Filter by date
    const filteredData = data.filter((item) => {
      if (!item.Date) return false;
      const itemDate = new Date(item.Date);
      const afterStart = startDate ? itemDate >= new Date(startDate) : true;
      const beforeEnd = endDate ? itemDate <= new Date(endDate) : true;
      return afterStart && beforeEnd;
    });

    if (filteredData.length === 0) {
      setTreemapData([]);
      setCategoryStats([]);
      setLoading(false);
      return;
    }

    let waybillData = {};

    filteredData.forEach((document) => {
      const waybill = document.Waybill || "Unknown";
      const weight = document.Weight || 0;
      const boxes = document.Boxes || 1;

      if (!waybillData[waybill]) {
        waybillData[waybill] = { totalWeight: 0, totalBoxes: 0 };
      }

      waybillData[waybill].totalWeight += weight;
      waybillData[waybill].totalBoxes += boxes;
    });

    const groupedData = filteredData.reduce((acc, item) => {
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

    const totalBoxes = filteredData.reduce((sum, item) => sum + (item.Boxes || 1), 0);
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

    setTreemapData(structuredTreemapData);
    setCategoryStats(stats);
    setLoading(false);
  }, [data, startDate, endDate]);

  return (
    <div className="data-container">

     

      {loading ? (
        <p>Loading data...</p>
      ) : treemapData.children?.length === 0 ? (
        <p>No data in selected range.</p>
      ) : (
        <>
          <ResponsiveContainer className="tree" height={400}>
            <Treemap
              data={treemapData.children}
              dataKey="size"
              stroke="#fff"
              fill="rgba(255, 255, 255, 0)"
            >
              <Tooltip content={<CustomTooltip />} />
            </Treemap>
          </ResponsiveContainer>
          <div className="bubble-container-stats">
             {/* Date Filters */}
            <div className="date-filter-section">
              <label>
                Start Date:
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </label>
              <label>
                End Date:
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </label>
            </div>
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
