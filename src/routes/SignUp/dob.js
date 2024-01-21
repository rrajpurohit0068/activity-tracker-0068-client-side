import * as React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function DateOfBith({ value, onChange, error, helperText }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        label="DOB *"
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        disableFuture
        openTo="year"
        views={["year", "month", "day"]}
      />
    </LocalizationProvider>
  );
}
