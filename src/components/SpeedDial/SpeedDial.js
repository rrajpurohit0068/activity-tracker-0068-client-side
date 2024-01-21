import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import AppBar from "@mui/material/AppBar";
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

import {
  Home,
  LocalActivity,
  AppRegistration,
  Add,
  Login,
  Logout,
  Schedule,
  Person,
} from "@mui/icons-material";

const drawerWidth = 240;

const navItems = [
  {
    title: "Home",
    url: "/",
    isVisible: () => {
      return true;
    },
    icon: <Home />,
    onClick: (navigate, dispatch) => (e) => {
      navigate("/");
    },
  },
  {
    title: "Activities",
    url: "/activities",
    isVisible: (isLogin) => {
      return !!isLogin;
    },
    icon: <LocalActivity />,
    onClick: (navigate, dispatch) => (e) => {
      navigate("/activities");
    },
  },
  {
    title: "Create Activity",
    url: "/create",
    isVisible: (isLogin) => {
      return !!isLogin;
    },
    icon: <Add />,
    onClick: (navigate, dispatch) => (e) => {
      navigate("/create");
    },
  },

  // {
  //   title: "Contribute",
  //   url: "/payment",
  //   isVisible: () => {
  //     return true;
  //   },
  // },
  
  {
    title: "Comment on Activity Coming Soon",
    icon: <Schedule style={{ opacity: 0.7 }} />,
    disabled: true,
    onClick: () => () => {},
    isVisible: (isLogin) => {
      return isLogin;
    },
  },
  {
    title: "More about Owner",
    icon: <Person />,
    disabled: true,
    onClick: () => () => {
      window.open("https://rrajpurohit0068.github.io/", "_blank");
    },
    isVisible: (isLogin) => {
      return true;
    },
  },
];

export function SpeedDialComponent(props) {
  const isLogin = useSelector((state) =>
    get(state, "loginTokenReducer.isLogin")
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = (e, reason) => reason === "toggle" && setOpen(true);
  const handleClose = (e, reason) => reason === "toggle" && setOpen(false);

  return (
    <React.Fragment>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {[...navItems].reverse().map((action) =>
            <SpeedDialAction
              icon={action.icon}
              tooltipTitle={action.title}
              tooltipOpen
              onClick={(...args) => {
                action.onClick(navigate, dispatch)(...args);
                setOpen(false);
              }}
              disableTouchListener={action.disabled}
            />

        )}
      </SpeedDial>
    </React.Fragment>
  );
}
