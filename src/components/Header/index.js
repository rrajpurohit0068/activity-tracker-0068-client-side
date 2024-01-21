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

const drawerWidth = 240;

const navItems = [
  {
    title: "Home",
    url: "/",
    isVisible: () => {
      return true;
    },
  },
  {
    title: "Activities",
    url: "/activities",
    isVisible: (isLogin) => {
      return !!isLogin;
    },
  },
  {
    title: "Create Activity",
    url: "/create",
    isVisible: (isLogin) => {
      return !!isLogin;
    },
  },
  {
    title: "Sign Up",
    url: "/signup",
    isVisible: (isLogin) => {
      return !isLogin;
    },
  },
  {
    title: "Login",
    url: "/login",
    isVisible: (isLogin) => {
      return !isLogin;
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
    title: "Logout",
    onClick: (navigate, dispatch) => (e) => {
      e.preventDefault();
      axios
        .post("users/accounts/logout")
        .then(() => {
          dispatch(setLoginTokenAction(null));
          ls.clear();
          navigate("/");
        })
        .catch(() => {
          dispatch(setLoginTokenAction(null));
          ls.clear();
          navigate("/");
        });
    },
    isVisible: (isLogin) => {
      return isLogin;
    },
  },
];

export function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isLogin = useSelector((state) =>
    get(state, "loginTokenReducer.isLogin")
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Activity Tracker
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) =>
          item.isVisible(isLogin) ? (
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <NavLink
                  to={item.url}
                  onClick={item.onClick?.(navigate, dispatch)}
                >
                  <ListItemText primary={item.title} />
                </NavLink>
              </ListItemButton>
            </ListItem>
          ) : null
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  console.log(moment.utc().valueOf());

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div">
            <NavLink to="/">Activity Tracker</NavLink>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
