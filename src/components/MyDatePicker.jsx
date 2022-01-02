import React, { useState } from "react";

import "./MyDatePicker.css";
function MyDatePicker(props) {
  const { dateSelection } = props;

  let maxDate = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const onChangeHandler = (event) => {
    dateSelection(event.target.value);
    setDate(event.target.value);
  };

  return (
    <div className="date-picker-container">
      <input
        type="date"
        name="Date selection"
        max={maxDate}
        value={date}
        onChange={onChangeHandler}
      ></input>
    </div>
  );
}

export default MyDatePicker;
