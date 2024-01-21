import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import moment from "moment";
import ls from "localstorage-slim";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { setLoginTokenAction } from "../../Provider/Redux/loginToken";

import { Typing } from "./Typing";
import styled from "styled-components";

const H1 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Home(props) {
  return (
    <div>
      <H1>Free Open Source Project</H1>
      <H1>Developed by Rajiv Rajpurohit</H1>

      <Typing></Typing>
    </div>
  );
}
