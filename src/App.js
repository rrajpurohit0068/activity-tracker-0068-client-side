import React from "react";
import { Header } from "./components/Header";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import "./App.css";
import { Redux } from "./Provider/Redux";
import { Router } from "./Provider/Router";
import { Theme } from "./Provider/Theme";
import { HashRouter } from "react-router-dom";
import { AppUtil } from "./Provider/AppUtil";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import styled from "styled-components";

import "./utils/axios.interceptors";
import { SpeedDialComponent } from "./components/SpeedDial";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Redux>
          <AppUtil>
            <Theme>
              <Header />
              <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Router />
                <SpeedDialComponent />
              </Box>
            </Theme>
          </AppUtil>
        </Redux>
      </HashRouter>
    </div>
  );
}

export default App;
