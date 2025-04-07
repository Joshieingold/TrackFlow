import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "./orderTable.css";

export const OrderTable = ({ data }) => {
  const [filterText, setFilterText] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [technicianFilter, setTechnicianFilter] = useState("");

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
      (item) =>
        locationFilter === "All" || item.Location.includes(locationFilter)
    )
    .filter(
      (item) =>
        !technicianFilter || item.Technician.toLowerCase().includes(technicianFilter.toLowerCase())
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
    <div className="order-table-main-container">
      <div className="search-customization-container">
        <div className="filter-option">
          <p>Search Waybill:</p>
          <input
            type="text"
            placeholder="Search Waybill..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="filter-option">
          <p>Search Technician:</p>
          <input
            type="text"
            placeholder="Technician Name.."
            value={technicianFilter}
            onChange={(e) => setTechnicianFilter(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="filter-option">
          <p>Filter by Location:</p>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="input-field"
          >
            <option value="All">All</option>
            <option value="Saint John">Saint John</option>
            <option value="Moncton">Moncton</option>
            <option value="Fredericton">Fredericton</option>
            <option value="Other">Other</option>
          </select>
        </div>

        

        <div className="date-container">
          <div className="filter-option">
            <p>From Date:</p>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            className="input-field"
            />
          </div>
          <div className="filter-option">
            <p>To Date:</p>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>

      <div className="data-table">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          className="custom-data-table"
        />
      </div>
    </div>
  );
};
