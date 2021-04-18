import React, { useState } from "react";
import storage from "local-storage-fallback";
import { DragSwitch } from "react-dragswitch";
import "react-dragswitch/dist/index.css";
import "./SideDrawer.css";
import DrawerToggleButton from "../DrawerToggleButton/DrawerToggleButton";

const SideDrawer = (props) => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }

  const [checked, setChecked] = useState(
    storage.getItem("checked") === "true" ? false : true
  );

  return (
    <nav
      className={drawerClasses}
      style={
        checked ? { backgroundColor: "white" } : { backgroundColor: "#555" }
      }
    >
      <div className="itemContainer">
        <DrawerToggleButton
          theme={props.theme}
          click={props.drawerCloseClickHandler}
        />
        <br />
        <a href="/" className="items">
          Global Stat Page
        </a>
        <br />
        <a href="/ca" className="items">
          {" "}
          Canada Stat Page
        </a>
        <br />
        <div className="lightToggleContainer">
          <h1 className="items">Turn the lights {checked ? "off!" : "on!"}</h1>
        </div>
        <div className="lightToggle">
          <DragSwitch
            checked={checked}
            onChange={(e) => {
              setChecked(e);
              props.changeTheme(true);
              storage.setItem("checked", JSON.stringify(checked));
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default SideDrawer;
