import React from "react";
import StatsCard from "./StatsCard";
import "./StatsCardDeck.css";

function StatsCardDeck(props) {
  const { data1 } = props;
  let deckOfCards;
  deckOfCards = data1.map((provStats) => {
    if (provStats.region !== null) {
      return (
        <StatsCard
          key={provStats.region}
          cardTitle={provStats.region}
          data1={provStats.vaccine_administration_dose_3}
          data2={provStats.vaccine_administration_total_doses}
          text="Recieved dose 3"
        />
      );
    } else {
      return null;
    }
  });

  return (
    <React.Fragment>
      <h2>Vaccination Status</h2>
      <div className="card-deck-container">{deckOfCards}</div>
    </React.Fragment>
  );
}
export default StatsCardDeck;
