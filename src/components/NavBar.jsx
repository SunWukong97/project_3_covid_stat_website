import React, { Component } from "react";
import "./NavBar.css";
import logo from "../images/logo.png";

import MyDatePicker from "./MyDatePicker";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <a href="index.html" className="navbar-logo">
            <img src={logo} alt="the logo" />
            COVID STATS CAN
          </a>

          <MyDatePicker dateSelection={this.props.dateSelection} />
        </div>
      </nav>
    );
  }
}

export default NavBar;
