import './App.css'
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/home.jsx";
import OrderStatisticsPage from './OrderPage/OrderStatistics/orderStatistics.jsx';
import SubmitOrder from './OrderPage/SubmitOrder/submitOrder.jsx';
import "./GeneralComponents/General.css";
import OrderHistory from './OrderPage/OrderHistory/orderHistory.jsx';
import { LoginPage } from './LoginPage/loginpage.jsx';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/Home" element={<HomePage/>} />
          <Route path="/OrderStatistics" element={<OrderStatisticsPage/>} />
          <Route path="/SubmitOrder" element={<SubmitOrder/>} />
          <Route path="/ContractorStatistics" element={"ContractorStatisticsPage"} />
          <Route path="/ContractorOverview" element={"ContractorOverviewPage"} />
          <Route path="/OrderHistory" element={<OrderHistory/>}/>
        </Routes>
      </Router> 
    </>
  )
}

export default App
