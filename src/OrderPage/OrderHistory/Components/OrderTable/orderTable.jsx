import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "./orderTable.css";
export const OrderTable = ({ data }) => {
  const [filterText, setFilterText] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");

  // Ensure data is an array before running filter operations
  const filteredData = (data || [])
    .filter((item) =>
      item.Waybill?.toLowerCase().includes(filterText.toLowerCase())
    )
    .filter((item) => {
      if (!fromDate && !toDate) return true;
      const itemDate = new Date(item.Date);
      return (
        (!fromDate || itemDate >= new Date(fromDate)) &&
        (!toDate || itemDate <= new Date(toDate))
      );
    })
    .filter(
      (item) => locationFilter === "All" || item.Location === locationFilter
    );

  const columns = [
    { name: "Waybill", selector: (row) => row.Waybill, sortable: true },
    { name: "Total Boxes", selector: (row) => row.Boxes, sortable: true },
    {
      name: "Total Weight",
      selector: (row) => `${row.Weight} lb`,
      sortable: true,
    },
    { name: "Technician", selector: (row) => row.Technician, sortable: true },
    { name: "Location", selector: (row) => row.Location, sortable: true },
    {
      name: "Date Completed",
      selector: (row) =>
        new Date(row.Date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      sortable: true,
    },
  ];

  return (
    <div style={{ padding: "20px", width: "100%", height: "100%" }}>
      <div className="search-customization-container">
        <div className="date-container">
          <p>Search Waybill:</p>
          <input
            type="text"
            placeholder="Search Waybill..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="text-input"
          />
        </div>

        <div className="date-container">
          <p>Filter by Location:</p>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="text-input"
          >
            <option value="All">All</option>
            <option value="Saint John">Saint John</option>
            <option value="Moncton">Moncton</option>
            <option value="Fredericton">Fredericton</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <div className="date-container">
            <p>From Date:</p>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="date-container">
            <p>To Date:</p>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="data-table" style={{ width: "100%", overflowX: "auto" }}>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          customStyles={{
            table: {
              style: {
                width: "100%",
              },
            },
          }}
        />
      </div>
    </div>
  );
};
