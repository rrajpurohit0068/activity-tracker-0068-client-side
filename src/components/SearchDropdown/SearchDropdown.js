import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";
import { ListOption } from "./ListOption";

export const SearchDropdown = ({
  filterOptions,
  fullWidth,
  required,
  onBlur,
  showList,
  label,
  onSelect,
  onInputChange,
  inputValue,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <TextField
        label={label}
        value={inputValue}
        onChange={onInputChange}
        onBlur={onBlur}
        required={required}
        fullWidth
      />
      {showList && filterOptions.length ? (
        <ListOption filterOptions={filterOptions} onSelect={onSelect} />
      ) : null}
    </div>
  );
};
