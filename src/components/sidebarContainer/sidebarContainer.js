import React, { Component } from "react";

import SideDrawer from "../SideDrawer/SideDrawer";
import Navbar from "../NavBar";

class SidebarContainer extends Component {
  state = {
    sideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  drawerCloseClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: false };
    });
  };

  render() {
    return (
      <div style={{ height: "100%" }}>
        <Navbar
          drawerClickHandler={this.drawerToggleClickHandler}
          theme={this.props.theme}
          changeTheme={this.props.changeTheme}
        />
        <SideDrawer
          drawerCloseClickHandler={this.drawerCloseClickHandler}
          show={this.state.sideDrawerOpen}
        />
      </div>
    );
  }
}

export default SidebarContainer;
