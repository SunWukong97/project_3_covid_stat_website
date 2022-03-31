import React from "react";
import StatsCard from "./StatsCard";
import "./StatsCardDeck.css";

function StatsCardDeck(props) {
  const { data1, data2 } = props;
  let deckOfCards;
  deckOfCards = data1.map((provStats) => {
    return data2.map((provInfo) => {
      if (
        provStats.province !== "Repatriated" &&
        provStats.province === provInfo.province
      ) {
        return (
          <StatsCard
            key={provStats.province}
            provinceName={provStats.province}
            fullyVacc={provStats.cumulative_cvaccine}
            population={provInfo.pop}
          />
        );
      }
      return null;
    });
  });
  return (
    <React.Fragment>
      <h2>Vaccination Status</h2>
      <div className="card-deck-container">{deckOfCards}</div>
    </React.Fragment>
  );
}
export default StatsCardDeck;
