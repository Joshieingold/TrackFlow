import Logo from '../../../assets/logo.png';
import './bannerLogo.css';
import React from 'react';
export const BannerLogo = () => {
  return (
    <div className="logo-content-banner">
      <div className="icon-container-banner">
        <img className="icon-banner" src={Logo} alt="Logo" />
      </div>
      <h2 className="logo-text-banner">TrackFlow</h2>
    </div>
  );
}