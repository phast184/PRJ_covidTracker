import React from "react";
import logo from "../asset/logo.svg";
import burgerMenu from '../asset/burgerMenu.svg'
import './NavBar.css'
import DrawerToggleButton from "./DrawerToggleButton/DrawerToggleButton";
const NavBar = props => (
    <div className="navbar">
      <DrawerToggleButton click={props.drawerClickHandler} />
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

export default NavBar;
