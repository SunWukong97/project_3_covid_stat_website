import React from "react";
import "./StatusBar.css";
function StatusBar(props) {
  const { data, data2, barType } = props;
  const styling = `status-bar ${barType}`;
  let stat;
  let percentage = ((data / data2) * 100).toFixed(2);

  stat = percentage + "%";

  if (barType === "cases") {
    stat = data;
  }
  if (percentage < 5) {
    percentage = 6.5;
  }

  percentage += "%";

  return (
    <div className="status-bar-wrapper">
      <p>{stat}</p>
      <div className="status-bar-bg">
        <div className={styling} style={{ width: percentage }}></div>
      </div>
    </div>
  );
}

export default StatusBar;
