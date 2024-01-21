import React from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import styled from "styled-components";
import { isEmpty } from "lodash";
import axios from "axios";
import ls from "localstorage-slim";
import Alert from "@mui/material/Alert";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { setLoginTokenAction, isLoginStateSelector } from "./Redux/loginToken";
import { setActivitysAction } from "./Redux/activity";
import { setStatusAction } from "./Redux/status";
import { useNavigate } from "react-router-dom";

export const AppUtil = ({ children }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector(isLoginStateSelector);
  React.useEffect(() => {
    if (isLogin) {
      const fetchAll = async () => {
        // const [{ data: status }, { data: activity }] = await Promise.all([
        //   await axios.get("activity/status/"),
        //   await axios.get("activity/activity/"),
        // ]);


        // const status = 
        // dispatch(setStatusAction(status));
        // dispatch(setActivitysAction(activity));
      };
      fetchAll();
    }
  }, [isLogin]);
  return <React.Fragment>{children}</React.Fragment>;
};
