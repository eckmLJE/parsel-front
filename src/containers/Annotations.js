import React, { Component } from "react";
import AnnotationCard from "../components/AnnotationCard";

class Annotations extends Component {
  render() {
    return (
      <div className="annotations">
        {this.props.annotations.map(annotation => (
          <AnnotationCard
            key={annotation.id}
            annotation={annotation}
            hoveredHighlight={this.props.hoveredHighlight}
            setHoverHighlight={this.props.setHoverHighlight}
          />
        ))}
      </div>
    );
  }
}

export default Annotations;
