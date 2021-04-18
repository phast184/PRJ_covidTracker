import React, { useState } from "react";
import logo from "../asset/logo.svg";
import burgerMenuBlack from "../asset/burgerMenuBlack.svg";
import burgerMenuWhite from "../asset/burgerMenuWhite.svg";
import "./NavBar.css";
import { DragSwitch } from "react-dragswitch";
import "react-dragswitch/dist/index.css";
import storage from "local-storage-fallback";
import DrawerToggleButton from "./DrawerToggleButton/DrawerToggleButton";

const NavBar = ({ theme, changeTheme, drawerClickHandler }) => {
  const [checked, setChecked] = useState(
    storage.getItem("checked") === "true" ? false : true
  );

  return (
    <div className="navbar">
      <DrawerToggleButton click={drawerClickHandler} />
      <DragSwitch
        checked={checked}
        onChange={(e) => {
          setChecked(e);
          changeTheme(true);
          storage.setItem("checked", JSON.stringify(checked));
        }}
      />
      <div className="logo">
        <img src={logo} alt="logo" />
        <div className="name">
          <h3>COVID-19</h3>
          <h4>SAFETY MAP</h4>
        </div>
      </div>

      <div className="login">
        <h3>LOGIN</h3>
      </div>
    </div>
  );
};

export default NavBar;
