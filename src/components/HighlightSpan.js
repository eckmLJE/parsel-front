import React from "react";

const HighlightSpan = props => {
  let key = 0;
  return (
    <span className="highlight" name={props.name} key={++key}>
      {props.content}
    </span>
  );
};

export default HighlightSpan;
