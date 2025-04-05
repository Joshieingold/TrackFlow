import React, { useEffect, useState } from 'react';
import { MainNavbar } from "../../GeneralComponents/MainNavbar/mainNavbar.jsx";
import './orderStatistics.css'; // Import your CSS file for styling
import { OrdersNavbar } from '../OrdersNavbar/ordersNavbar.jsx';
import { fetchOrdersData } from '../../GeneralComponents/Database/databaseFunctions.jsx';
import OptChart from './Components/OrdersPerTechChart/optChart.jsx'; // Import your chart component
import DptChart from "./Components/DevicesPerTechChart/dptChart.jsx";
import WaybillTreemap from './Components/OrdersTreeMap/OrdersTreeMap.jsx';
const OrderStatisticsPage = () => {
  const [data, setData] = useState(null); // Store fetched data in state
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await fetchOrdersData(); // Wait for data
        setData(ordersData);
      } catch (error) {
        console.error("Error fetching data:", error); // Handle errors
      } finally {
        setLoading(false); // Stop loading once done
      }
    };

    fetchData();
  }, []);

  return (
    <div className='order-statistics-page'>
      <MainNavbar />
      <OrdersNavbar />
      <div className="two-bubble-container">
        <div className="bubble">
          {loading ? <p>Loading chart...</p> : <OptChart data={data} />}
        </div>
        <div className="bubble">
          {loading ? <p>Loading chart...</p> : <DptChart data={data} />}
        </div>
      </div>
      <div className='one-bubble-container'>
        <div className="bubble">
          <h2 className='title-text'>Order Visualization</h2>
        {loading ? <p>Loading chart...</p> : <WaybillTreemap data={data} />}
        </div>  
      </div>
    </div>
  );
};

export default OrderStatisticsPage;
