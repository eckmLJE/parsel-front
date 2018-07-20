import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import StatementListItem from "./StatementListItem";

class StatementList extends Component {
  state = { activeItem: "1" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.setStatement(name);
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fluid vertical>
        {this.props.statements.map(statement => {
          return (
            <StatementListItem
              key={statement.id}
              handleItemClick={this.handleItemClick}
              statement={statement}
              activeItem={activeItem}
            />
          );
        })}
      </Menu>
    );
  }
}

export default StatementList;
