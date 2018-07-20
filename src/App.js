import React, { Component } from "react";
import "./App.css";
import Statement from "./components/Statement";
import HighlightSpan from "./components/HighlightSpan";
import TextFragment from "./components/TextFragment";
import Annotations from "./containers/Annotations";
import TitleBar from "./components/TitleBar";
import { Grid } from "semantic-ui-react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentStatement:
        "Today’s press conference in Helsinki was one of the most disgraceful performances by an American president in memory. The damage inflicted by President Trump’s naiveté, egotism, false equivalence, and sympathy for autocrats is difficult to calculate. But it is clear that the summit in Helsinki was a tragic mistake. President Trump proved not only unable, but unwilling to stand up to Putin. He and Putin seemed to be speaking from the same script as the president made a conscious choice to defend a tyrant against the fair questions of a free press, and to grant Putin an uncontested platform to spew propaganda and lies to the world. It is tempting to describe the press conference as a pathetic rout — as an illustration of the perils of under-preparation and inexperience. But these were not the errant tweets of a novice politician. These were the deliberate choices of a president who seems determined to realize his delusions of a warm relationship with Putin’s regime without any regard for the true nature of his rule, his violent disregard for the sovereignty of his neighbors, his complicity in the slaughter of the Syrian people, his violation of international treaties, and his assault on democratic institutions throughout the world. Coming close on the heels of President Trump’s bombastic and erratic conduct towards our closest friends and allies in Brussels and Britain, today’s press conference marks a recent low point in the history of the American Presidency. That the president was attended in Helsinki by a team of competent and patriotic advisors makes his blunders and capitulations all the more painful and inexplicable. No prior president has ever abased himself more abjectly before a tyrant. Not only did President Trump fail to speak the truth about an adversary; but speaking for America to the world, our president failed to defend all that makes us who we are — a republic of free people dedicated to the cause of liberty at home and abroad. American presidents must be the champions of that cause if it is to succeed. Americans are waiting and hoping for President Trump to embrace that sacred responsibility. One can only hope they are not waiting totally in vain. - John McCain",
      currentAnnotations: [
        {
          id: "1001",
          start: 41,
          end: 116,
          content: "A powerful statement in its simplicity"
        }, // one of the most disgraceful performances by an American president in memory
        {
          id: "1003",
          start: 393,
          end: 448,
          content: "This could literally be true"
        }, // He and Putin seemed to be speaking from the same script
        {
          id: "1002",
          start: 251,
          end: 315,
          content: "Think of his entire team that is supporting this"
        }, // But it is clear that the summit in Helsinki was a tragic mistake
        {
          id: "1004",
          start: 419,
          end: 489,
          content: "A conscious choice? If he's not suffering from dementia"
        } // speaking from the same script as the president made a conscious choice
      ],
      annotationId: 1004,
      currentHighlights: [],
      statementArray: [],
      hoveredHighlight: ""
    };
  }

  componentDidMount = () => {
    this.processAnnotations();
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
        console.log("overlap detected!");
      }
    });
    this.setState({ currentHighlights: highlights });
  };

  createHighlight = annotation => {
    return {
      name: annotation.id,
      start: annotation.start,
      end: annotation.end
    };
  };

  makeStatementArray = () => {
    const statement = this.state.currentStatement;
    const highlights = this.state.currentHighlights;
    let newStatementArray = [];
    let charCounter = 0;
    highlights.forEach(highlight => {
      newStatementArray.push(
        <TextFragment
          key={newStatementArray.length}
          content={statement.slice(charCounter, highlight.start)}
        />
      );
      newStatementArray.push(
        <HighlightSpan
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
    this.setState({
      statementArray: newStatementArray
    });
  };

  setHoverHighlight = id => {
    console.log("set highlight id", id);
    this.setState({
      hoveredHighlight: id
    });
  };

  render() {
    return (
      <div className="App">
        <TitleBar />
        {this.state.currentHighlights.length > 0 ? (
          <div
            style={{
              width: "75%",
              margin: "auto",
              backgroundColor: "grey"
            }}
          >
            <Grid
              columns={2}
              padded
              relaxed
              style={{ backgroundColor: "white" }}
            >
              <Grid.Row>
                <Grid.Column width={10}>
                  <Statement
                    content={this.state.statementArray}
                    makeStatementArray={this.makeStatementArray}
                  />
                </Grid.Column>
                <Grid.Column width={6}>
                  <Annotations annotations={this.state.currentAnnotations} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
