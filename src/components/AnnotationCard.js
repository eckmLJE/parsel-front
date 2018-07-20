import React from "react";
import { Segment } from "semantic-ui-react";

const AnnotationCard = props => {
  let color = props.hoveredHighlight.includes(props.annotation.id)
    ? "blue"
    : "black";

  return (
    <Segment
      onMouseEnter={() => props.setHoverHighlight(props.annotation.id)}
      onMouseLeave={() => props.setHoverHighlight("telephone")}
      className="annotation"
      inverted
      secondary
      color={color}
    >
      {props.annotation.content}
    </Segment>
  );
};

export default AnnotationCard;
