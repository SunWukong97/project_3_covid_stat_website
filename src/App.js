import logo from "./logo.svg";
import "./App.css";
import React from "react";
import NavBar from "./components/NavBar.jsx";
import HeroSection from "./components/HeroSection";
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <HeroSection />
    </React.Fragment>
  );
}

export default App;
