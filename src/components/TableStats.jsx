import React from "react";
import StatusBar from "./StatusBar";
import "./TableStats.css";
function TableStats(props) {
  const { data1, data2, data3, date } = props;
  let tableData;
  let canadaCovidStat = data3[0];

  let canadaPopulation = calculateCountryPop(data2);
  //needed as it maybe called before api call has been completed
  tableData = data1.map((provCovidStat) => {
    return data2.map((provInfo) => {
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
                <p className="provinces-names">{canadaCovidStat.province}</p>
              </td>
              <td className="table-cell">
                <StatusBar
                  data={canadaCovidStat.active_cases}
                  data2={canadaPopulation}
                  barType="cases"
                />
              </td>
              <td className="table-cell">
                <StatusBar
                  data={canadaCovidStat.cumulative_recovered}
                  data2={canadaCovidStat.cumulative_cases}
                  barType="recovered"
                />
              </td>
              <td className="table-cell">
                <StatusBar
                  data={canadaCovidStat.cumulative_deaths}
                  data2={canadaCovidStat.cumulative_cases}
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
    if (provinceInfo.province !== "Repatriated") totalPop += provinceInfo.pop;
  }

  return totalPop;
}
export default TableStats;
