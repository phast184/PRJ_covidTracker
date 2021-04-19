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
          theme={this.props.theme}
          drawerClickHandler={this.drawerToggleClickHandler}
        />
        <SideDrawer
          drawerCloseClickHandler={this.drawerCloseClickHandler}
          show={this.state.sideDrawerOpen}
          theme={this.props.theme}
          changeTheme={this.props.changeTheme}
        />
      </div>
    );
  }
}

export default SidebarContainer;
