import React, { Component } from "react";
import StatusBar from "./StatusBar";
import "./TableStats.css";
class TableStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet1: null,
      dataSet2: null,
      isLoading: true,
      date: null,
    };
  }
  componentDidMount() {
    let nodataDate = "2032-01-01";
    let todayDate = new Date();
    let yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    let formatDate = yesterdayDate.toISOString().slice(0, 10);
    const apiUrl1 = `https://api.opencovid.ca/summary?date=${formatDate}`;
    const apiUrl2 = "https://api.opencovid.ca/other?stat=prov";

    let apiUrls = [apiUrl1, apiUrl2];

    Promise.all(
      apiUrls.map((urlIndex) =>
        fetch(urlIndex).then((response) => parseJson(response))
      )
    ).then((data) => {
      console.log("Success", data[0]);
      console.log("Success", data[1]);
      this.setState({
        dataSet1: data[0].summary,
        dataSet2: data[1].prov,
        isLoading: false,
        date: formatDate,
      });
    });
  }

  render() {
    let tableData;
    let date;
    //needed as it maybe called before api call has been completed
    if (!this.state.isLoading && this.state.dataSet1.length !== 0) {
      date = this.state.date;

      tableData = this.state.dataSet1.map((provCovidStat) => {
        return this.state.dataSet2.map((provInfo) => {
          if (
            provCovidStat.province === provInfo.province &&
            provCovidStat.province !== "Repatriated"
          ) {
            let provinceName;
            if (provInfo.province === "BC") {
              provinceName = "British Columbia";
            } else if (provInfo.province === "NL") {
              provinceName = "Newfoundland and Labrador";
            } else {
              provinceName = provInfo.province;
            }
            return (
              <tr key={provCovidStat.province} className="table-row">
                <td className="table-cell province-table-cell">
                  <p className="provinces-names">{provinceName}</p>
                </td>
                <td className="table-cell">
                  <StatusBar
                    data={provCovidStat.active_cases}
                    data2={provInfo.pop}
                    barType="cases"
                  />
                </td>
                <td className="table-cell">
                  <StatusBar
                    data={provCovidStat.cumulative_recovered}
                    data2={provCovidStat.cumulative_cases}
                    barType="recovered"
                  />
                </td>
                <td className="table-cell">
                  <StatusBar
                    data={provCovidStat.cumulative_deaths}
                    data2={provCovidStat.cumulative_cases}
                    barType="mortality"
                  />
                </td>
              </tr>
            );
          }
          return null;
        });
      });
    } else {
      tableData = (
        <tr>
          <td colSpan="4" align="center">
            <p className="error">Data is Currently Unavailable</p>
          </td>
        </tr>
      );
    }

    return (
      <React.Fragment>
        <h1 className="date">{date}</h1>
        <div className="table-container">
          <table>
            <tbody>
              <tr className="table-header">
                <td className="table-cell">
                  <h2>Province/Territories</h2>
                </td>
                <td className="table-cell">
                  <h2>Number Of Active Cases</h2>
                </td>
                <td className="table-cell">
                  <h2>Recovered</h2>
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
  }
}
function parseJson(response) {
  return response.json();
}

export default TableStats;
