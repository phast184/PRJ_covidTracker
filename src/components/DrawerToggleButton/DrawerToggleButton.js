import React from 'react'

import './DrawerToggleButton.css'
import burgerMenuBlack from '../../asset/burgerMenuBlack.svg'
import burgerMenuWhite from '../../asset/burgerMenuWhite.svg'
import storage from "local-storage-fallback";

const drawerToggleButton = props => (
    <button className="toggle-button" onClick={props.click}>
      <img src = {props.theme === "dark" ? burgerMenuWhite : burgerMenuBlack} alt = "burger menu" />
    </button>
  )

export default drawerToggleButton