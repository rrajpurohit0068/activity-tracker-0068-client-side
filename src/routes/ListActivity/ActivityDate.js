import * as React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function ActivityDate({ value, onChange, error, helperText, disabled }) {
  return (
    <span>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Activity Date"
          value={value}
          onChange={onChange}
          error={error}
          helperText={helperText}
          disableFuture
          openTo="year"
          views={["year", "month", "day"]}
          componentsProps={{
            actionBar: { actions: ["today", "cancel", "accept"] },
          }}
          disabled={disabled}
        />
      </LocalizationProvider>
    </span>
  );
}
