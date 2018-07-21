import React, { Component } from "react";
import { Form, TextArea, Button } from "semantic-ui-react";

class AnnotationWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  handleChange = (e, d) => {
    this.setState({ input: d.value });
  };
  handleClick = () => {
    const annotationContent = this.state.input;
    this.props.postAnnotation(annotationContent);
    this.setState({input: ""})
  };

  render() {
    return (
      <div>
        <em>"{this.props.selection}"</em>
        <br />
        <Form>
          <TextArea
            placeholder="Tell us what you think"
            style={{ minHeight: 100 }}
            onChange={this.handleChange}
          />
        </Form>
        <br />
        <Button primary onClick={this.handleClick}>
          Submit
        </Button>
      </div>
    );
  }
}

export default AnnotationWidget;
