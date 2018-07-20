import React from "react";
import { Menu } from "semantic-ui-react";

const StatementListItem = props => {
  return (
      <Menu.Item
        name={props.statement.id}
        active={props.activeItem === props.statement.id}
        onClick={props.handleItemClick}
      >
        {props.statement.attributes.title}
      </Menu.Item>
  );
};

export default StatementListItem;
