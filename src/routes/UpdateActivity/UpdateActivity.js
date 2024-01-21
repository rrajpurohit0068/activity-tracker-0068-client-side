import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { status } from "../../api/status";
import styled from "styled-components";
import { isEmpty } from "lodash";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addActivityAction,
  replaceActivityAction,
  setExpandedActivity,
  setUpdateActivity,
  updateActivityStateSelector,
} from "../../Provider/Redux/activity";
import LoadingButton from "@mui/lab/LoadingButton";
import { statusStateSelector } from "../../Provider/Redux/status";
import { userStateSelector } from "../../Provider/Redux/loginToken";
import { Wrapper, Container } from "../../components/styled/CenterComponent";
import moment from "moment";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const priorityList = [
  {
    id: 1,
    title: "High",
  },
  {
    id: 2,
    title: "Moderate",
  },
  {
    id: 3,
    title: "Low",
  },
];
const UpdateActivityComponent = ({ activity }) => {
  const id = activity.id;
  const created = activity.created;
  const [title, setTitle] = React.useState(activity.title);
  const [desc, setDesc] = React.useState(activity.desc);
  const [status, setStatus] = React.useState(activity.status_id);
  const [priority, setPriority] = React.useState(activity.priority);
  const [error, setError] = React.useState({});

  const [loading, setLoading] = React.useState(false);

  const statusList = useSelector(statusStateSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeMapFn = {
    title: setTitle,
    desc: setDesc,
    status: setStatus,
    priority: setPriority,
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

    console.log({
      title: title,
      desc: desc,
      status,
      priority,
    });
    const error = {};

    if (!title.trim()) {
      error.title = "Please enter title";
    }
    if (!status) {
      error.status = "Please select status";
    }

    if (!isEmpty(error)) {
      setError(error);
      return;
    }

    const activityNew = {
      id,
      title,
      desc,
      status_id: status,
      priority,
      created,
      updated: moment()
    };
    try {
      setLoading(true);
      console.log(activityNew);
      dispatch(replaceActivityAction(activityNew));
      setLoading(false);
      dispatch(setExpandedActivity(status));
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
          <h1>Update Activity</h1>
          <TextField
            required
            label="Title"
            value={title}
            onChange={(e) => {
              onChange(e, "title");
            }}
            error={!!error.title}
            helperText={error.title}
          />
          <TextField
            label="Description"
            value={desc}
            onChange={(e) => {
              onChange(e, "desc");
            }}
            error={!!error.desc}
            helperText={error.desc}
            multiline
            rows={4}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              required
              label="Status"
              value={status}
              onChange={(e) => {
                onChange(e, "status");
              }}
              error={!!error.status}
              helperText={error.status}
            >
              {statusList.map((statusObject) => {
                return (
                  <MenuItem value={statusObject.id}>
                    {statusObject.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Prority</InputLabel>
            <Select
              required
              label="Status"
              value={priority}
              onChange={(e) => {
                onChange(e, "priority");
              }}
              error={!!error.priority}
              helperText={error.priority}
            >
              {priorityList.map((priority) => {
                return (
                  <MenuItem value={priority.id}>{priority.title}</MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <ButtonWrapper>
            <LoadingButton
              variant="outlined"
              disabled={loading}
              style={{
                marginRight: "16px",
              }}
            >
              <NavLink to="/activities">
                <span>Cancel</span>
              </NavLink>
            </LoadingButton>

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

export const UpdateActivity = () => {
  const activity = useSelector(updateActivityStateSelector);
  if (!activity) {
    return null;
  }
  return <UpdateActivityComponent activity={activity} />;
};
