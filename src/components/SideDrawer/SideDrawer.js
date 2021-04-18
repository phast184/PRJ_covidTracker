import React, { useState } from 'react';
import storage from "local-storage-fallback";
import { DragSwitch } from "react-dragswitch";
import "react-dragswitch/dist/index.css";
import './SideDrawer.css'
import DrawerToggleButton from '../DrawerToggleButton/DrawerToggleButton'

const SideDrawer = (props) => {
  let drawerClasses = 'side-drawer'
  if (props.show) {
    drawerClasses = 'side-drawer open'
  }

  const [checked, setChecked] = useState(
    storage.getItem("checked") === "true" ? false : true
  );

  return (
    <nav className={drawerClasses}>
      <div className="itemContainer">
        <DrawerToggleButton click={props.drawerCloseClickHandler} />
        <br />
        <a href="/" className="items">Login</a>
        <br />
        <a href="/covid" className="items">Global Stat Page</a>
        <br />
        <a href="/covid/ca" className="items"> Canada Stat Page</a>
        <br />
        <button className="items">Darkmode</button>
        <DragSwitch
          checked={checked}
          onChange={(e) => {
            setChecked(e);
            props.changeTheme(true);
            storage.setItem("checked", JSON.stringify(checked));
          }}
        />
      </div>
    </nav>
  )
}

export default SideDrawer;