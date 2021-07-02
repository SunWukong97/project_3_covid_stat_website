import React, { Component } from "react";
import "./NavBar.css";
class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-logo">
            COVID STATS CAN
          </a>
        </div>
      </nav>
    );
  }
}

export default NavBar;
