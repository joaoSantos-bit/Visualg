import React from "react";
import Bar from "./Bar";

const BarsContainer = ({ heightContainer, barsValues, maxValue, color }) => {
  const containerStyle = {
    padding: "50px 30px 10px 30px",
    display: "flex",
    alignItems: "flex-end",
    boxSizing: "border-box",
    justifyContent: "space-evenly",
    height: heightContainer
  };

  const renderedBars = barsValues.map((barValue, index) => {
    return (
      <Bar
        id={index}
        key={index}
        height={`calc((100% / ${maxValue}) * ${barValue})`}
        width={`calc(90% / ${barsValues.length})`}
        color={color}
      />
    );
  });

  return (
    <div className="Container" style={containerStyle}>
      {renderedBars}
    </div>
  );
};

export default BarsContainer;
