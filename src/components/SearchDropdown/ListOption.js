import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import styled from "styled-components";

const ListWrapper = styled(List)`
  width: 100%;
  position: absolute !important;
  max-height: 270px;
  opacity: 1;
  background: white;
  z-index: 2;
  overflow: auto;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
`;

export function ListOption({ filterOptions, onSelect }) {
  return (
    <ListWrapper>
      {filterOptions.map((option) => (
        <li onClick={() => onSelect(option)} key={`section-${option.id}`}>
          <ListItem>
            <ListItemText primary={`${option.label}`} />
          </ListItem>
        </li>
      ))}
    </ListWrapper>
  );
}
