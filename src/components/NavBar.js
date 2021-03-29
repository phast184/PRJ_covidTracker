import React from "react";
import logo from "../asset/logo.svg";
import burgerMenu from '../asset/burgerMenu.svg'
import './NavBar.css'
const NavBar = () => {
  return (
    <div className="navbar">
      <div className = "hamburger">
        <img src = {burgerMenu} alt = "burger menu" />
      </div>
      <div className="logo">
        <img src={logo} alt = "logo" />
        <div className = 'name'>
          <h3>COVID-19</h3>
          <h4>SAFETY MAP</h4>
        </div>
      </div>

      <div className = "login">
        <h3>LOGIN</h3>
      </div>
    </div>
  );
};

export default NavBar;
