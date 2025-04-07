import './App.css'
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/home.jsx";
import OrderStatisticsPage from './OrderPage/OrderStatistics/orderStatistics.jsx';
import SubmitOrder from './OrderPage/SubmitOrder/submitOrder.jsx';
import "./GeneralComponents/General.css";
import OrderHistory from './OrderPage/OrderHistory/orderHistory.jsx';
import { LoginPage } from './LoginPage/loginPage.jsx';
import RequireAuth from './GeneralComponents/RequireAuth/requireAuth.jsx';
import Logout from './LogoutPage/logout.jsx';
import { ComingSoon } from './GeneralComponents/ComingSoon/comingSoon.jsx';

function App() {
  return (
    <Router> {/* ✅ This is the missing piece */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element =
          {
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          } 
        />
        <Route path="/Logout" element =
          {
            <RequireAuth>
              {<Logout/>}
            </RequireAuth>
          }/>
        <Route path="/OrderStatistics" element =
          {
            <RequireAuth>
              <OrderStatisticsPage />
            </RequireAuth>
          }/>
        <Route path="/SubmitOrder" element =
          {
            <RequireAuth>
              <SubmitOrder />
            </RequireAuth>
          }/>
        <Route path="/OrderHistory" element =
          {
            <RequireAuth>
              <OrderHistory />
            </RequireAuth>
          }/>
        <Route path="/ContractorStatistics" element = 
          {
            <RequireAuth>
              {"ContractorStatisticsPage"}
            </RequireAuth>
          }/>
        <Route path="/ContractorOverview" element = 
          {
            <RequireAuth>
              {<ComingSoon/>}
            </RequireAuth>
          }/>
      </Routes>
    </Router>
  );
}

export default App;
