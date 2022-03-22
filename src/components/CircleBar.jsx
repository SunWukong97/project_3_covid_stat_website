import React from "react";
import "./CircleBar.css";
function CircleBar(props) {
  const { size, percentage } = props;
  let strokeWidth = 8;
  let radius = size / 2;

  let svgStyle = {
    //width and height needs to be 2 * the radius for it to work properly
    width: `${radius * 2}`,
    height: `${radius * 2}`,
  };
  let strokeColour = "#28C557";
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
  let offset = circumference - (circumference * percentage) / 100;
  return (
    <div className="circle-bar">
      <svg style={svgStyle}>
        <circle
          style={circleStyle}
          cx={radius + 15}
          cy={radius + 15}
          r={radius}
          stroke={strokeColour}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference}, ${circumference}`}
          /*
          strokeDashoffset: if same length as circumference if will be 0%
          if is 0 it is 100%
          */
          strokeDashoffset={offset}
        />
      </svg>
      <p className="percentage">{`${percentage}%`}</p>
    </div>
  );
}

export default CircleBar;
