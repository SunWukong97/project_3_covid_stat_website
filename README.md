# project_3_covid_stat_website

## About

[link to website](https://thomasnly.github.io/project_3_covid_stat_website/).

A web app created with react that utilizes the fetch api interface in order to show covid stats in canada. API used [Open Covid](https://opencovid.ca/api/) through the use of the [Creative Commons Attribution 4.0 international license](https://creativecommons.org/licenses/by/4.0/).

The purpose of this project was to create a data visualization of major COVID statistics in Canada in easily read manner through the use of bar graphs.

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
      dataSet1: null,
      dataSet2: null,
      dataSet3: null,
      dataSet4: null,
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
const apiUrl1 = `https://api.opencovid.ca/summary?date=${dateValue}`;
```

After that `Promise.all` is used to fetch and process data from the api as multiple apis urls being used at once to retrieve 3 datasets since `fetch` can only be used for a single api url. Then `this.setState` property is used to store the 3 datasets

The method for handling the api call:

```jsx
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
      // console.log("Success", data[0]);
      // console.log("Success", data[1]);
      // console.log("success", data[2]);

      this.setState({
        dataSet1: data[0].summary,
        dataSet2: data[1].prov,
        dataSet3: data[2].summary,
        isLoading: false,
        date: dateValue,
      });
    });
  }
```

The reason for creating a method to handle the api call is to allow the NavBar component to fetch the datasets from the different dates selected by the user.

```jsx
<NavBar dateSelection={this.apiCall} />
```
