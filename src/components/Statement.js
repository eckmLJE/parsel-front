import React, { Component } from "react";
import { Card } from "semantic-ui-react";

class Statement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHighlights: [],
      statementHTML: ""
    };
  }

  componentDidMount = () => {
    // this.props.makeStatementArray();
  };

  render() {
    return (
      <Card fluid className="statement">
        <Card.Content className="content-text">
          <Card.Header>Statement</Card.Header>
          <Card.Description>{this.props.content}</Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default Statement;
