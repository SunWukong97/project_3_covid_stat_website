// import logo from "./logo.svg";
import "./App.css";

import NavBar from "./components/NavBar.jsx";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import CircleBar from "./components/CircleBar";
import StatsCard from "./components/StatsCard";
import StatsCardDeck from "./components/StatsCardDeck";
import React, { Component } from "react";
class App extends Component {
  constructor(props) {
    super(props);
    this.apiCall = this.apiCall.bind(this);
    this.parseJson = this.parseJson.bind(this);
    //this.dateSelection = this.dateSelection.bind(this);

    this.state = {
      dataSet1: null,
      dataSet2: null,
      dataSet3: null,
      dataSet4: null,
      isLoading: true,
      date: null,
    };
  }

  componentDidMount() {
    let todayDate = new Date();
    let yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    let formatDate = yesterdayDate.toISOString().slice(0, 10);

    this.apiCall(formatDate);
  }

  //handles the api call and requires a date in yyyy-mm-dd or dd-mm-yyyy format as an argument
  apiCall(dateValue) {
    const apiUrl1 = `https://api.opencovid.ca/summary?date=${dateValue}`;
    const apiUrl2 = "https://api.opencovid.ca/other?stat=prov";
    const apiUrl3 = `https://api.opencovid.ca/summary?loc=canada&date=${dateValue}`;
    let apiUrls = [apiUrl1, apiUrl2, apiUrl3];

    Promise.all(
      apiUrls.map((urlIndex) =>
        fetch(urlIndex).then((response) => this.parseJson(response))
      )
    ).then((data) => {
      console.log("Success", data[0]);
      console.log("Success", data[1]);
      console.log("success", data[2]);

      this.setState({
        dataSet1: data[0].summary,
        dataSet2: data[1].prov,
        dataSet3: data[2].summary,
        isLoading: false,
        date: dateValue,
      });
    });
  }

  parseJson(response) {
    return response.json();
  }

  // dateSelection(date) {
  //   this.apiCall(date);
  // }

  render() {
    console.log(this.state.dataSet1);
    let heroSection;
    let statsCardDeck;
    if (!this.state.isLoading && this.state.dataSet1.length !== 0) {
      heroSection = (
        <HeroSection
          data1={this.state.dataSet1}
          data2={this.state.dataSet2}
          data3={this.state.dataSet3}
          date={this.state.date}
        />
      );
      statsCardDeck = (
        <StatsCardDeck
          data1={this.state.dataSet1}
          data2={this.state.dataSet2}
        />
      );
    } else {
      heroSection = <p className="error">Data is currently Unavailable</p>;
    }
    return (
      <React.Fragment>
        <NavBar dateSelection={this.apiCall} />
        {heroSection}
        {statsCardDeck}
        <AboutSection />
      </React.Fragment>
    );
  }
}

export default App;
