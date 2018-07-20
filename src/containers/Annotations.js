import React, { Component } from "react";
import AnnotationCard from "../components/AnnotationCard";
import { Card, Segment, Header } from "semantic-ui-react";

class Annotations extends Component {
  render() {
    return (
      <div className="annotations">
        {this.props.annotations.map(annotation => (
          <AnnotationCard
            key={annotation.id}
            annotation={annotation}
            hoveredHighlight={this.props.hoveredHighlight}
          />
        ))}
      </div>
    );
  }
}

export default Annotations;
