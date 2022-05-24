// import logo from "./logo.svg";
import "./App.css";

import NavBar from "./components/NavBar.jsx";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import StatsCardDeck from "./components/StatsCardDeck";
import React, { Component } from "react";
class App extends Component {
  constructor(props) {
    super(props);
    this.apiCall = this.apiCall.bind(this);
    this.parseJson = this.parseJson.bind(this);

    this.state = {
      dataSet1CovidStats: null,
      dataSet2CountryCovidStats: null,
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
    const apiCovidStatUrl = `https://api.opencovid.ca/summary?date=${dateValue}`;
    //const apiPopulationUrl = null;

    const apiCountryUrl = `https://api.opencovid.ca/summary?geo=can&date=${dateValue}&fill=true&version=true&pt_names=short&hr_names=hruid&fmt=json`;

    //const apiRecoveryUrl = null;
    let apiUrls = [apiCovidStatUrl, apiCountryUrl];

    Promise.all(
      apiUrls.map((urlIndex) =>
        fetch(urlIndex, {
          method: "Get",
        }).then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return this.parseJson(response);
        })
      )
    )
      .then((data) => {
        console.log("Success", data[0].data);
        console.log("Success", data[1]);

        this.setState({
          dataSet1CovidStats: data[0].data,
          dataSet2CountryCovidStats: data[1].data[0],
          isLoading: false,
          date: dateValue,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  parseJson(response) {
    return response.json();
  }

  // dateSelection(date) {
  //   this.apiCall(date);
  // }

  render() {
    let heroSection;
    let statsCardDeck;

    if (!this.state.isLoading) {
      heroSection = (
        <HeroSection
          data1={this.state.dataSet1CovidStats}
          data2={this.state.dataSet2CountryCovidStats}
          date={this.state.date}
        />
      );
      statsCardDeck = (
        <StatsCardDeck
          data1={this.state.dataSet1CovidStats}
          cardText="Recieved dose 3"
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
