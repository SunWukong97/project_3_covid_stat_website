import React from "react";

function MyDatePicker(props) {
  const { dateSelection } = props;
  const onChangeHandler = (event) => {
    dateSelection(event.target.value);
  };

  return (
    <input type="date" name="Date selection" onChange={onChangeHandler}></input>
  );
}

export default MyDatePicker;
