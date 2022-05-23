import React from "react";
import StatusBar from "./StatusBar";
import "./TableStats.css";
function TableStats(props) {
  const { data1, data2, data3, data4, date } = props;
  let tableData;
  let canadaCovidStat = data3;
  let countryName = "Canada";

  let canadaPopulation = calculateCountryPop(data2);
  let canadaTotalRecoveries = calcualteCountryTotalRecovered(data4);
  //needed as it maybe called before api call has been completed
  tableData = data2.map((provInfo) => {
    return data1.map((provCovidStat) => {
      if (provCovidStat.region === provInfo.code) {
        let provinceName = provInfo.name;
        let provinceTotalRecoveredCases = data4.find(
          (element) => element.province === provInfo.code
        );

        provinceTotalRecoveredCases =
          provinceTotalRecoveredCases.total_recoveries;
        return (
          <tr key={provCovidStat.region} className="table-row">
            <td className="table-cell province-table-cell">
              <p className="provinces-names">{provinceName}</p>
            </td>
            <td className="table-cell">
              <StatusBar
                data={provCovidStat.cases}
                data2={provInfo.population}
                barType="cases"
              />
            </td>
            <td className="table-cell">
              <StatusBar
                data={provinceTotalRecoveredCases}
                data2={provCovidStat.cases}
                barType="recovered"
              />
            </td>
            <td className="table-cell">
              <StatusBar
                data={provCovidStat.deaths}
                data2={provCovidStat.cases}
                barType="mortality"
              />
            </td>
          </tr>
        );
      }
      return null;
    });
  });

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
                <h2>Number Of Active Cases</h2>
              </td>
              <td className="table-cell">
                <h2>Recovered</h2>
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
                <StatusBar
                  data={canadaCovidStat.cases}
                  data2={canadaPopulation}
                  barType="cases"
                />
              </td>
              <td className="table-cell">
                <StatusBar
                  data={canadaTotalRecoveries}
                  data2={canadaCovidStat.cases}
                  barType="recovered"
                />
              </td>
              <td className="table-cell">
                <StatusBar
                  data={canadaCovidStat.deaths}
                  data2={canadaCovidStat.cases}
                  barType="mortality"
                />
              </td>
            </tr>
          </tbody>
        </table>
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

/**
 *
 * @param {Oject[]} this_data used to calculate the entire population of the country by adding up the individual populations of each province/territory.
 * @returns integer value of the country's population
 */
function calculateCountryPop(this_data) {
  let totalPop = 0;
  for (const provinceInfo of this_data) {
    if (provinceInfo.population !== null) {
      totalPop += provinceInfo.population;
    }
  }

  return totalPop;
}

function calcualteCountryTotalRecovered(this_data) {
  let totalRecovered = 0;
  for (const province of this_data) {
    totalRecovered += province.total_recoveries;
  }
  return totalRecovered;
}
export default TableStats;
