import React from "react";
function CircleBar() {
  let strokeWidth = 2;
  let radius = 40;

  let style = {
    //width and height needs to be 2 * the radius for it to work properly
    width: `${radius * 2}`,
    height: `${radius * 2}`,
    background: "grey",
  };
  let circleStyle = {
    //the transformation point is based off the svg continer
    transform: "rotate(-90deg)",

    //set origin for transformation to center coordinates of svg container
    transformOrigin: "50% 50%",
  };

  //radius needs to be -2x the stroke width to prevent it from overflowing out of its container
  radius = radius - strokeWidth * 2;

  // set both strokeDasharray values: width, dash gap, to circumference so it will become 1 large dash covering the entire circumference
  //since gap is the same length it won't be visible
  let circumference = radius * 2 * Math.PI;
  let percentage = 70;
  let offset = circumference - (circumference * percentage) / 100;
  return (
    <svg style={style}>
      <circle
        style={circleStyle}
        cx={radius}
        cy={radius}
        r={radius}
        stroke="white"
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={`${circumference}, ${circumference}`}
        /*
        strokeDashoffset: if same length as circumference if will be 0%
        if circumference is 0 it is 100%
        */
        strokeDashoffset={offset}
      />
    </svg>
  );
}

export default CircleBar;
