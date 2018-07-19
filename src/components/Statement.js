import React, { Component } from "react";

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
        <button onClick={this.props.highlightBody}>Highlight</button>
      </div>
    );
  }
}

export default Statement;
