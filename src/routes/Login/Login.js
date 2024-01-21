import React from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import styled from "styled-components";
import { isEmpty } from "lodash";
import axios from "axios";
import ls from "localstorage-slim";
import Alert from "@mui/material/Alert";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { setLoginTokenAction } from "../../Provider/Redux/loginToken";
import { setActivitysAction } from "../../Provider/Redux/activity";
import { setStatusAction } from "../../Provider/Redux/status";
import { useNavigate } from "react-router-dom";
import { Wrapper, Container } from "../../components/styled/CenterComponent";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [p1, setP1] = React.useState("");
  const [error, setError] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeMapFn = {
    email: setEmail,
    p1: setP1,
  };
  const onChange = (e, key) => {
    setError((prev) => {
      return {
        ...prev,
        [key]: "",
      };
    });
    onChangeMapFn[key](e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const error = {};
    if (!validateEmail(email)) {
      error.email = "Please enter valid email";
    }
    if (!p1) {
      error.p1 = "Please enter password";
    }
    if (!isEmpty(error)) {
      setError(error);
      return;
    }
    setLoading(true);
    try {
      const { data: login } = await axios.post("users/accounts/login", {
        email,
        password: p1,
      });

      ls.set("login", login, { ttl: 60 * 60 * 2 });

      ls.set("access", login.access, { ttl: 60 * 60 * 2 });

      const { data: user } = await axios.get("users/accounts/get-user");

      dispatch(setLoginTokenAction(login, user));

      ls.set("user", user);
      setLoading(false);
      navigate("/activities");
    } catch (e) {
      setLoading(false);
      console.log(e);
      setError({
        global: e.message,
      });
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <Wrapper>
        <Container>
          <h1>Login</h1>
          {error.global ? <Alert severity="error">{error.global}</Alert> : null}

          <TextField
            required
            label="Email"
            value={email}
            onChange={(e) => {
              onChange(e, "email");
            }}
            error={!!error.email}
            helperText={error.email}
          />
          <TextField
            required
            label="Password"
            type="password"
            value={p1}
            onChange={(e) => {
              onChange(e, "p1");
            }}
            error={!!error.p1}
            helperText={error.p1}
          />

          <ButtonWrapper>
            <LoadingButton
              loading={loading}
              variant="outlined"
              disabled={loading}
              type="submit"
            >
              <span>Submit</span>
            </LoadingButton>
          </ButtonWrapper>
        </Container>
      </Wrapper>
    </form>
  );
};
