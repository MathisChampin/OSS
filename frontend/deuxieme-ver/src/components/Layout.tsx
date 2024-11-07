import React from 'react';
import leftImage from '../assets/images/left.jpg';
import './layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <img src={leftImage} alt="Left Decoration" className="left-decoration" />
      <div className="content">
        {children}
      </div>
      <img src={leftImage} alt="Right Decoration" className="right-decoration" />
    </div>
  );
};

export default Layout;
