import React from 'react'

import './SideDrawer.css'
import DrawerToggleButton from '../DrawerToggleButton/DrawerToggleButton'

const sideDrawer = props => {
    let drawerClasses = 'side-drawer'
    if (props.show) {
      drawerClasses = 'side-drawer open'
    }
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
        </div>
    </nav>
  )
}

export default sideDrawer