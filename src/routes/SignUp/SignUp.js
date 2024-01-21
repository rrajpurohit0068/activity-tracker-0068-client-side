import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { status } from "../../api/status";
import styled from "styled-components";
import { DateOfBith } from "./dob";
import { isEmpty } from "lodash";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Wrapper, Container } from "../../components/styled/CenterComponent";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";

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

export const SignUp = () => {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [dob, setDob] = React.useState();
  const [p1, setP1] = React.useState("");
  const [p2, setP2] = React.useState("");
  const [error, setError] = React.useState({});

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const onChangeMapFn = {
    email: setEmail,
    firstName: setFirstName,
    lastName: setLastName,
    dob: setDob,
    p1: setP1,
    p2: setP2,
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
  const onChangeValue = (value, key) => {
    setError((prev) => {
      return {
        ...prev,
        [key]: "",
      };
    });
    onChangeMapFn[key](value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log({
      email: email,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dob,
      password: p1,
      password2: p2,
    });
    const error = {};
    if (!validateEmail(email)) {
      error.email = "Please enter valid email";
    }
    if (!firstName.trim()) {
      error.firstName = "Please enter firstName";
    }
    if (!lastName.trim()) {
      error.lastName = "Please enter lastName";
    }
    if (!dob) {
      error.dob = "Please select or enter valid dob";
    } else {
      if (!dob.isValid()) {
        error.dob = "Please enter valid date";
      }

      if (dob.isAfter(new Date())) {
        error.dob = "Invalid date";
      }
    }
    if (!p1) {
      error.p1 = "Please enter password";
    }
    if (!p2) {
      error.p2 = "Please enter password";
    }
    if (p1 !== p2) {
      error.p2 = "Please enter password matching above";
    }
    if (!isEmpty(error)) {
      setError(error);
      return;
    }

    const body = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dob.format("YYYY-MM-DD"),
      password: p1,
      password2: p2,
    };
    setLoading(true);
    axios
      .post("users/accounts/register", body)
      .then((res) => {
        setLoading(false);

        navigate("/login");

        console.log(res);
      })
      .catch((e) => {
        setLoading(false);

        console.log(e);
        setError({
          global: e.message,
        });
      });
    console.log({ body });
  };
  return (
    <form onSubmit={onSubmit}>
      <Wrapper>
        <Container>
          <h1>SignUp</h1>
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
            label="First Name"
            value={firstName}
            onChange={(e) => {
              onChange(e, "firstName");
            }}
            error={!!error.firstName}
            helperText={error.firstName}
          />
          <TextField
            required
            label="Last Name"
            value={lastName}
            onChange={(e) => {
              onChange(e, "lastName");
            }}
            error={!!error.lastName}
            helperText={error.lastName}
          />
          <DateOfBith
            value={dob}
            onChange={(e) => {
              onChangeValue(e, "dob");
            }}
            error={!!error.dob}
            helperText={error.dob}
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

          <TextField
            required
            label="Match Password Above"
            type="password"
            value={p2}
            onChange={(e) => {
              onChange(e, "p2");
            }}
            error={!!error.p2}
            helperText={error.p2}
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
