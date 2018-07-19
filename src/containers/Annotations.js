import React, { Component } from "react";
import AnnotationCard from "../components/AnnotationCard";
import { Card } from "semantic-ui-react"

class Annotations extends Component {
  render() {
    return (
      <div className="annotations">
        <h1>Annotations</h1>
        <Card.Group>
          {this.props.annotations.map(annotation => (
            <AnnotationCard key={annotation.id} annotation={annotation} />
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default Annotations;
