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
    if (!this.state.isLoading) {
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
    }

    return (
      <React.Fragment>
        <p className="date">{date}</p>
        <div className="table-container">
          <table>
            <tbody>
              <tr className="table-header">
                <td className="table-cell">
                  <p>Province/Territories</p>
                </td>
                <td className="table-cell">
                  <p>Number Of Cases</p>
                </td>
                <td className="table-cell">
                  <p>Recovered</p>
                </td>
                <td className="table-cell">
                  <p>Mortality Rate</p>
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
