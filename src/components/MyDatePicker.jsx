import React from "react";

import "./MyDatePicker.css";
function MyDatePicker(props) {
  const { dateSelection } = props;
  const onChangeHandler = (event) => {
    dateSelection(event.target.value);
  };

  return (
    <div className="date-picker-container">
      <input
        type="date"
        name="Date selection"
        onChange={onChangeHandler}
      ></input>
    </div>
  );
}

export default MyDatePicker;
