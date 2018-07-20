import React from "react";

let key = 0;

const HighlightSpan = props => {
  return (
    <span
      className={props.highlightClass}
      name={props.name}
      key={++key}
      onMouseEnter={() => props.setHoverHighlight(props.name)}
      onMouseLeave={() => props.setHoverHighlight("telephone")}
    >
      {props.content}
    </span>
  );
};

export default HighlightSpan;
