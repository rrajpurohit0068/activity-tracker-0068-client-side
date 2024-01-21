import React from "react";
import { ActivityContainer } from "../routes/ListActivity";
import { CreateActivity } from "../routes/CreateActivity";
import { SignUp } from "../routes/SignUp";
import { Login } from "../routes/Login";
import { Payment } from "../routes/Payment";
import { Home } from "../routes/Home";
import { UpdateActivity } from "../routes/UpdateActivity";

import { createBrowserRouter, Routes, Route } from "react-router-dom";

const router = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/activities",
    element: <ActivityContainer />,
  },
  {
    path: "/create",
    element: <CreateActivity />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/update-activity",
    element: <UpdateActivity />,
  },
];
export function Router({ children }) {
  return (
    <Routes>
      {router.map(({ path, element }) => {
        return <Route path={path} element={element} />;
      })}
    </Routes>
  );
}
