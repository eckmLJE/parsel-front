import React from "react";
import { Card } from "semantic-ui-react";

const Statement = props => {
  return (
    <Card
      fluid
      className="statement"
      style={{ height: "80vh", overflowY: "scroll" }}
    >
      <Card.Content className="content-text">
        <Card.Header>{props.title}</Card.Header>
        <Card.Description onMouseUp={props.getSelection} className="content-text">
          {props.content}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default Statement;
