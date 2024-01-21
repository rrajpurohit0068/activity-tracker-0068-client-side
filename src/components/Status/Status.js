import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { statusStateSelector } from "../../Provider/Redux/status";

export const StatusComponent = ({
  fullWidth,
  required,
  value,
  onChange,
  includeAll,
}) => {
  const statusList = useSelector(statusStateSelector);

  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel>Status</InputLabel>
      <Select
        required={required}
        label="Status"
        value={value}
        onChange={onChange}
      >
        {includeAll ? <MenuItem value={-1}>All Status</MenuItem> : null}

        {statusList.map((statusObject) => {
          return (
            <MenuItem value={statusObject.id}>{statusObject.title}</MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
