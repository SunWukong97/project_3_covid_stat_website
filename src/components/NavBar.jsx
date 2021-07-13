import React, { Component } from "react";
import "./NavBar.css";
import logo from "../images/logo.png";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <a href="index.html" className="navbar-logo">
            <img src={logo} alt="the logo" />
            COVID STATS CAN
          </a>
        </div>
      </nav>
    );
  }
}

export default NavBar;
