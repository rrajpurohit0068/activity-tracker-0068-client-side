import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const priorityList = [
  {
    id: 1,
    title: "High",
  },
  {
    id: 2,
    title: "Moderate",
  },
  {
    id: 3,
    title: "Low",
  },
];
export const PriorityComponent = ({
  fullWidth,
  required,
  value,
  onChange,
  includeAll,
}) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel>Priority</InputLabel>
      <Select
        required={required}
        label="Status"
        value={value}
        onChange={onChange}
      >
        {includeAll ? <MenuItem value={-1}>All Priority</MenuItem> : null}
        {priorityList.map((priority) => {
          return <MenuItem value={priority.id}>{priority.title}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};
