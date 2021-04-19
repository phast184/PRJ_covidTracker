import React, { useState } from "react";
import logo from "../asset/logo.svg";
import "./NavBar.css";
import storage from "local-storage-fallback";
import DrawerToggleButton from "./DrawerToggleButton/DrawerToggleButton";
import { useAuth0 } from '@auth0/auth0-react'

const NavBar = ({ theme, changeTheme, drawerClickHandler }) => {

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  return (
    <div className="navbar">
      <DrawerToggleButton theme={theme} click={drawerClickHandler} />
      <div className="logo">
        <img src={logo} alt="logo" />
        <div className="name">
          <h3>COVID-19</h3>
          <h4>SAFETY MAP</h4>
        </div>
      </div>
      {isAuthenticated ?
      <div className = 'login'>
        <h5>
          Welcome, {user.given_name} 
        </h5>
        <button type='button' onClick={() => logout({ returnTo: window.location.origin })} >
          Logout
      </button> 
      </div>
        :
        <div className="login">
          <button type='button' onClick={loginWithRedirect}>
            Login
      </button>
        </div>
      }
    </div>
  );
};

export default NavBar;
