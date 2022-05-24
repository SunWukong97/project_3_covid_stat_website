# project_3_covid_stat_website

## Table of Contents

- [About](#about)
- [Fetching the data](#fetching-the-data)
- [Components](#components)

## About

[link to website](https://thomasnly.github.io/project_3_covid_stat_website/).

A web app created with react that utilizes the fetch api interface in order to show covid stats in canada. API used [Open Covid](https://opencovid.ca/api/) through the use of the [Creative Commons Attribution 4.0 international license](https://creativecommons.org/licenses/by/4.0/).

The purpose of this project was to create a data visualization of major COVID statistics in Canada in easily read manner through the use of bar graphs.

In the documentation for the project "..." will be used to represent ommited code/ parts which have been condensed to increase readability.

## Fetching the data

The App.js file contains the code where the api call is being made and passing the information from it to its child components.

Within App.js a class based component approach was used to create the App component by making it class that extends React's Component library and using `this.state` property to house the various datasets along with the publication date of the dataset.

```jsx
import React, { Component } from "react";
class App extends Component {
  constructor(props) {
    super(props);
    this.apiCall = this.apiCall.bind(this);
    this.parseJson = this.parseJson.bind(this);
    //this.dateSelection = this.dateSelection.bind(this);

    this.state = {
      dataSet1CovidStats: null,
      dataSet2CountryCovidStats: null,
      isLoading: true,
      date: null,
    };
  }
  ...
  }
```

Due to it being a class based component the method for fetching the api has to called in the componentDidMount() method to ensure that the App component has mounted and is being rendered in the browser first.

```jsx
componentDidMount() {
    let todayDate = new Date();
    let yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    let formatDate = yesterdayDate.toISOString().slice(0, 10);

    this.apiCall(formatDate);
  }
```

The apiCall method handles fetching the datasets by accepting a `dateValue` as a parameter in the following format: dd-mm-yyyy or yyyy-mm-dd. Which is then passed down to the api's url to retrieve the retrieve the dataset from that date.

```jsx
apiCall(dateValue);
```

```jsx
const apiCovidStatUrl = `https://api.opencovid.ca/summary?date=${dateValue}`;
```

After that `Promise.all` is used to fetch and process data from the api as multiple apis urls being used at once to retrieve 3 datasets since `fetch` can only be used for a single api url. Then `this.setState` property is used to store the 3 datasets along with whether or not they are still loading in.

The method for handling the api call:

```jsx
 apiCall(dateValue) {
     const apiCovidStatUrl = `https://api.opencovid.ca/summary?date=${dateValue}`;

    const apiCountryUrl = `https://api.opencovid.ca/summary?geo=can&date=${dateValue}&fill=true&version=true&pt_names=short&hr_names=hruid&fmt=json`;

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
```

The reason for creating a method to handle the api call is to allow the NavBar component to fetch the datasets from the different dates selected by the user.

```jsx
<NavBar dateSelection={this.apiCall} />
```

## Showing the data

In order to dynamically update the data being shown in the `render()` method some variables are created to store the current state/information of the HeroSection and StatsCardDeck components being shown.

```jsx
let heroSection;
let statsCardDeck;
```

They are then used in the return function within the render method

```jsx
return (
  <React.Fragment>
    <NavBar dateSelection={this.apiCall} />
    {heroSection}
    {statsCardDeck}
    <AboutSection />
  </React.Fragment>
);
```

In order to prevent an error of rendering the component before the api call is done loading or has failed to load the datasets an if else block is used to dynamically set whether the statiscs are shown or an error message instead.

```jsx
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
```

## Components

### HeroSection

The `<HeroSection data1={array[] data2={array[]} date={"yyyy-mm-dd"}}/>` component takes in 2 datasets along with a formatted date which are than passed over to its child component: `<TableStats />`

```jsx
function HeroSection(props) {
  const { data1, data2, date } = props;
  return (
    <React.Fragment>
      <TableStats data1Provincal={data1} data2Country={data2} date={date} />
    </React.Fragment>
  );
}
```

### TableStats

In the ` <TableStats data1Provincal={array[]} data2Country={array[]} date={date} />` component it creates a table with each row containing statistics for each province and the country to date: total number of cases to date, infection rate based on total number of cases to total cases conducted and total mortality rate by iterating through the datasets and creating a status bar representing each statistic. As the dataset is being iterated through a table row will be created for each province and stored in an array variable: `tableData`.

```jsx
function TableStats(props) {
  const { data1Provincal, data2Country, date } = props;
  let tableData;
  let canadaCovidStat = data2Country;
  let countryName = "Canada";
  //needed as it maybe called before api call has been completed
  tableData = data1Provincal.map((provCovidStat) => {
    if (provCovidStat !== null) {
      let provinceName = provCovidStat.region;
      return (
        <tr key={provCovidStat.region} className="table-row">
          <td className="table-cell province-table-cell">
            <p className="provinces-names">{provinceName}</p>
          </td>
          <td className="table-cell">
            <p>{provCovidStat.cases}</p>
          </td>
          <td className="table-cell">
            <StatusBar
              data={provCovidStat.cases}
              data2={provCovidStat.tests_completed}
              barColour="yellow"
            />
          </td>
          <td className="table-cell">
            <StatusBar
              data={provCovidStat.deaths}
              data2={provCovidStat.cases}
              barColour="blue"
            />
          </td>
        </tr>
      );
    } else {
      return null;
    }
  });
  ...
}
```

It will than be rendered in the return function of this component.

```jsx
return (
  <React.Fragment>
    <h1 className="date">{date}</h1>
    <div className="table-container">
      ...
      <table>
        <tbody>
          <tr className="table-header">
            <td className="table-cell">
              <h2>Province/Territories</h2>
            </td>
            <td className="table-cell">
              <h2>Total Cases</h2>
            </td>
            <td className="table-cell">
              <h2>Infection Rate</h2>
            </td>
            <td className="table-cell">
              <h2>Mortality Rate</h2>
            </td>
          </tr>
          {tableData}
        </tbody>
      </table>
    </div>
  </React.Fragment>
);
```

A table specifically for the whole country is above the one for each province

```jsx
return (
    <React.Fragment>
      <h1 className="date">{date}</h1>
      <div className="table-container">
        <table className="country-stats">
          <tbody>
            <tr className="table-header">
              <td className="table-cell">
                <h2>&nbsp;</h2>
              </td>
              <td className="table-cell">
                <h2>Total Cases</h2>
              </td>
              <td className="table-cell">
                <h2>Infection Rate</h2>
              </td>
              <td className="table-cell">
                <h2>Mortality Rate</h2>
              </td>
            </tr>
            <tr className="table-row">
              <td className="table-cell province-table-cell">
                <p className="provinces-names">{countryName}</p>
              </td>
              <td className="table-cell">
                <p>{canadaCovidStat.cases}</p>
              </td>
              <td className="table-cell">
                <StatusBar
                  data={canadaCovidStat.cases}
                  data2={canadaCovidStat.tests_completed}
                  barColour="yellow"
                />
              </td>
              <td className="table-cell">
                <StatusBar
                  data={canadaCovidStat.deaths}
                  data2={canadaCovidStat.cases}
                  barColour="blue"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table>
        ...
            {tableData}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
```
