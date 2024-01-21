import React from "react";
import { ActivityList } from "./ActivityList";
import { list_activity } from "../../api/list_activity";
import { users } from "../../api/user";
import { status } from "../../api/status";
import Button from "@mui/material/Button";
import { Accordions } from "./Accordion";
import axios from "axios";

export const ActivityContainer = () => {
  return (
    <div>
      <h1>Wellcome to Activity Tracker</h1>
      <Accordions />
    </div>
  );
};
