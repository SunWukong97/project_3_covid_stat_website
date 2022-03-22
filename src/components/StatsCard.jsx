import React from "react";
import CircleBar from "./CircleBar";
import "./StatsCard.css";
function StatsCard(props) {
  const { provinceName, fullyVacc, population } = props;
  let percentageVacc = parseInt((fullyVacc / population) * 100);
  return (
    <div className="card">
      <div className="card-content">
        <h2>{provinceName}</h2>
        <CircleBar size={150} percentage={percentageVacc} />
        <p>{fullyVacc}</p>
        <p>Fully vaccinated</p>
      </div>
    </div>
  );
}
export default StatsCard;
