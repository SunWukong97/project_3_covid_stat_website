import React from "react";
import CircleBar from "./CircleBar";
import "./StatsCard.css";
function StatsCard(props) {
  const { cardTitle, data1, data2, text } = props;
  let metric = data1 === "NULL" ? 0 : data1;
  let percentage = parseInt((metric / data2) * 100);
  return (
    <div className="card">
      <div className="card-content">
        <h2>{cardTitle}</h2>
        <CircleBar size={150} percentage={percentage} />
        <p>{metric}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}
export default StatsCard;
