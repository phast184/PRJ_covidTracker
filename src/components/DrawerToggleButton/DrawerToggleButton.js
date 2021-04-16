import React from 'react'

import './DrawerToggleButton.css'
import burgerMenu from '../../asset/burgerMenuBlack.svg'

const drawerToggleButton = props => (
    <button className="toggle-button" onClick={props.click}>
      <img src = {burgerMenu} alt = "burger menu" />
    </button>
  )

export default drawerToggleButton