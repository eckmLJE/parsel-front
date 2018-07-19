import React, { Component, Fragment } from "react";

class Statement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHighlights: [],
      statementHTML: ""
    };
  }

  componentDidUpdate = () => {};

  componentDidMount = () => {
    // this.highlightBody();
  };

  render() {
    return (
      <div>
        <h1>Statement</h1>
        <button onClick={this.props.makeBodyArray}>Highlight</button>
        <br />
        <br />
        <div className="statement">{this.props.content}</div>
        <div><Fragment>test test</Fragment></div>
      </div>
    );
  }
}

export default Statement;
