import React, { useState } from "react";

import "./MyDatePicker.css";
function MyDatePicker(props) {
  const { dateSelection } = props;

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let maxDate = yesterday.toISOString().slice(0, 10);
  let minDate = "2020-09-01";

  const [date, setDate] = useState(maxDate);
  const onChangeHandler = (event) => {
    let d1 = new Date(event.target.value);
    let d2 = new Date(minDate);

    if (d1 < d2) {
      dateSelection(minDate);
    } else {
      dateSelection(event.target.value);
      setDate(event.target.value);
    }
  };

  return (
    <div className="date-picker-container">
      <input
        type="date"
        name="Date selection"
        max={maxDate}
        min={minDate}
        value={date}
        onChange={onChangeHandler}
      ></input>
    </div>
  );
}

export default MyDatePicker;
