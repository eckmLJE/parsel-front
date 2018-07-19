import React from "react";
import { Card } from "semantic-ui-react";

const AnnotationCard = props => {
  return (
    <Card fluid>
      <Card.Header>{props.annotation.content}</Card.Header>
    </Card>
  );
};

export default AnnotationCard;
