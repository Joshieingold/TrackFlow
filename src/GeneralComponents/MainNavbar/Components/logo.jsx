import Logo from '../../../assets/logo.png';
import './logo.css';
import React from 'react';
export const FullLogo = () => {
  return (
    <div className="logo-content">
      <div className="icon-container">
        <img className="icon" src={Logo} alt="Logo" />
      </div>
      <h2 className="logo-text">Trackflow</h2>
    </div>
  );
}