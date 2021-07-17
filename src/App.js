// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import NavBar from "./components/NavBar.jsx";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <HeroSection />
      <AboutSection />
    </React.Fragment>
  );
}

export default App;
