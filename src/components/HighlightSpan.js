import React from "react";

const HighlightSpan = props => {
  let key = 0;
  let highlightClass = "highlight";
  if (props.hoveredHighlight) {
    props.hoveredHighlight.includes(props.name)
      ? (highlightClass = "highlight-alt")
      : null;
  }
  return (
    <span
      className={highlightClass}
      name={props.name}
      key={++key}
      onMouseEnter={() => props.setHoverHighlight(props.name)}
      onMouseLeave={() => props.setHoverHighlight("")}
    >
      {props.content}
    </span>
  );
};

export default HighlightSpan;
