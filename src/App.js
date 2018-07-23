import React, { Component } from "react";
import "./App.css";
import Statement from "./components/Statement";
import HighlightSpan from "./components/HighlightSpan";
import TextFragment from "./components/TextFragment";
import Annotations from "./containers/Annotations";
import TitleBar from "./components/TitleBar";
import { Grid, Segment } from "semantic-ui-react";
import StatementList from "./components/StatementList";
import AnnotationWidget from "./components/AnnotationWidget";

const statementsUrl = "http://localhost:3000/api/v1/statements";
const annotationsUrl = "http://localhost:3000/api/v1/annotations";

class App extends Component {
  constructor() {
    super();
    this.state = {
      availableStatements: [],
      availableAnnotations: [],
      currentStatement: null,
      currentAnnotations: [],
      hoveredHighlight: "nothing",
      currentSelection: ""
    };
  }

  componentDidMount = () => {
    this.fetchStatements();
  };

  fetchStatements = () => {
    fetch(statementsUrl)
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json =>
        this.setState({
          availableStatements: json.data,
          availableAnnotations: json.included.map(annotation =>
            this.convertAnnotation(annotation)
          )
        })
      );
  };

  convertAnnotation = annotation => {
    return {
      id: this.convertId(annotation.id),
      start: annotation.attributes.start,
      end: annotation.attributes.end,
      content: annotation.attributes.content,
      statementId: annotation.attributes["statement-id"]
    };
  };

  convertId = id => {
    let numId = parseInt(id, 10) + 1000;
    return numId.toString();
  };

  processAnnotations = () => {
    let highlights = [];
    let lastEnd = 0;
    let currentAnnotations = this.state.currentAnnotations.sort(
      (a, b) => a.start > b.start
    );
    currentAnnotations.forEach(annotation => {
      if (annotation.start > lastEnd) {
        highlights.push(this.createHighlight(annotation));
        lastEnd = annotation.end;
      } else {
        let lastHighlight = highlights.pop();
        const prevEnd = lastHighlight.end;
        lastHighlight.end = annotation.start;
        highlights.push(lastHighlight);
        highlights.push({
          name: `${lastHighlight.name} ${annotation.id}`,
          start: annotation.start,
          end: prevEnd
        });
        highlights.push({
          name: annotation.id,
          start: prevEnd,
          end: annotation.end
        });
        lastEnd = annotation.end;
      }
    });
    return highlights;
  };

  createHighlight = annotation => {
    return {
      name: annotation.id,
      start: annotation.start,
      end: annotation.end
    };
  };

  makeStatementArray = () => {
    const statement = this.state.currentStatement.attributes.content;
    const highlights = this.processAnnotations();
    let newStatementArray = [];
    let charCounter = 0;
    highlights.forEach(highlight => {
      const highlightClass = this.checkHoverHighlight(highlight.name);
      newStatementArray.push(
        <TextFragment
          key={newStatementArray.length}
          content={statement.slice(charCounter, highlight.start)}
        />
      );
      newStatementArray.push(
        <HighlightSpan
          highlightClass={highlightClass}
          content={statement.slice(highlight.start, highlight.end)}
          name={highlight.name}
          key={highlight.name}
          setHoverHighlight={this.setHoverHighlight}
          hoveredHighlight={this.state.hoveredHighlight}
        />
      );
      charCounter = highlight.end;
    });
    statement.length >= charCounter
      ? newStatementArray.push(
          statement.slice(charCounter, statement.length + 1)
        )
      : null;
    return newStatementArray;
  };

  setHoverHighlight = id => {
    this.setState({
      hoveredHighlight: id
    });
  };

  checkHoverHighlight = id => {
    return this.state.hoveredHighlight.includes(id) ||
      id.includes(this.state.hoveredHighlight)
      ? "highlight-alt"
      : "highlight";
  };

  setCurrentStatement = id => {
    const statement = this.state.availableStatements.find(
      statement => statement.id === id
    );
    const annotations = this.state.availableAnnotations.filter(
      annotation => annotation.statementId.toString() === id
    );
    this.setState({
      currentStatement: statement,
      currentAnnotations: annotations,
      currentSelection: null
    });
  };

  getSelection = e => {
    const selection = window.getSelection();
    console.log(selection);
    const base = selection.baseOffset;
    const extent = selection.extentOffset;
    if (!selection.baseNode.previousSibling && selection.type === "Range") {
      this.setState({
        currentSelection: { start: base, end: extent }
      });
    } else if (
      selection.baseNode.previousElementSibling.localName === "span" &&
      !selection.nextSibling &&
      selection.type === "Range"
    ) {
      const prevAnnotationId =
        selection.baseNode.previousElementSibling.attributes.name.value;
      const prevAnnotation = this.state.currentAnnotations.find(
        annotation => annotation.id === prevAnnotationId
      );
      this.setState({
        currentSelection: {
          start: prevAnnotation.end + base,
          end: prevAnnotation.end + extent
        }
      });
    } else if (selection.type === "Caret") {
      this.setState({
        currentSelection: null
      });
    }
  };

  postAnnotation = content => {
    const annotation = {
      statement_id: this.state.currentStatement.id,
      content: content,
      start: this.state.currentSelection.start,
      end: this.state.currentSelection.end
    };
    fetch(annotationsUrl, {
      method: "POST",
      body: JSON.stringify(annotation),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(json =>
        this.setState({
          currentAnnotations: [
            ...this.state.currentAnnotations,
            this.convertAnnotation(json.data)
          ],
          currentSelection: ""
        })
      );
  };

  getCurrentSelectionText = () => {
    const statement = this.state.currentStatement.attributes.content;
    const start = this.state.currentSelection.start;
    const end = this.state.currentSelection.end;
    return statement.slice(start, end);
  };

  render() {
    return (
      <div className="App">
        <TitleBar />
        <div style={{ height: 50 }} />

        <Grid padded relaxed columns={4}>
          <Grid.Row>
            <Grid.Column width={4}>
              <StatementList
                statements={this.state.availableStatements}
                setStatement={this.setCurrentStatement}
              />
            </Grid.Column>
            <Grid.Column width={7}>
              {this.state.currentStatement ? (
                <div>
                  <Segment>
                    <Statement
                      content={this.makeStatementArray()}
                      title={this.state.currentStatement.attributes.title}
                      getSelection={this.getSelection}
                    />
                  </Segment>
                  {this.state.currentSelection ? (
                    <Segment>
                      <AnnotationWidget
                        postAnnotation={this.postAnnotation}
                        selection={this.getCurrentSelectionText()}
                      />
                    </Segment>
                  ) : null}
                </div>
              ) : (
                <Segment>Select an available Statement</Segment>
              )}
            </Grid.Column>
            <Grid.Column width={4}>
              {this.state.currentAnnotations.length > 0 ? (
                <Annotations
                  annotations={this.state.currentAnnotations}
                  hoveredHighlight={this.state.hoveredHighlight}
                  setHoverHighlight={this.setHoverHighlight}
                />
              ) : null}
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
