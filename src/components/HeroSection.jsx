import React from "react";
import TableStats from "./TableStats";
function HeroSection(props) {
  const { data1, data2, data3, date } = props;
  return (
    <React.Fragment>
      <TableStats data1={data1} data2={data2} data3={data3} date={date} />
    </React.Fragment>
  );
}

export default HeroSection;
