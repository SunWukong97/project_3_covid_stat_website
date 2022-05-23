import React from "react";
import StatsCard from "./StatsCard";
import "./StatsCardDeck.css";

function StatsCardDeck(props) {
  const { data1, data2 } = props;
  let deckOfCards;
  deckOfCards = data1.map((provStats) => {
    return data2.map((provInfo) => {
      if (
        provStats.region !== "Repatriated" &&
        provStats.region === provInfo.code
      ) {
        return (
          <StatsCard
            key={provStats.region}
            provinceName={provInfo.name}
            fullyVacc={provStats.vaccine_administration_dose_2}
            population={provInfo.population}
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
