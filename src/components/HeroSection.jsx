import React from "react";
import TableStats from "./TableStats";
function HeroSection(props) {
  const { data1, data2, date } = props;
  return (
    <React.Fragment>
      <TableStats data1Provincal={data1} data2Country={data2} date={date} />
    </React.Fragment>
  );
}

export default HeroSection;
