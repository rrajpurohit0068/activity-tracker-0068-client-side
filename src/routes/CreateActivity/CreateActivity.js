import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { status } from "../../api/status";
import styled from "styled-components";
import { filter, isEmpty } from "lodash";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  activityStateSelector,
  addActivityAction,
  duplicateActivityStateSelector,
  setDuplicateActivity,
  setExpandedActivity,
} from "../../Provider/Redux/activity";
import LoadingButton from "@mui/lab/LoadingButton";
import { statusStateSelector } from "../../Provider/Redux/status";
import { userStateSelector } from "../../Provider/Redux/loginToken";
import moment from "moment";
import { Wrapper, Container } from "../../components/styled/CenterComponent";
import { SearchDropdown } from "../../components/SearchDropdown";
import { v4 as uuidv4 } from 'uuid';


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
export const CreateActivity = () => {
  const [title, setTitle] = React.useState("");
  const [activitySelected, setActivitySelected] = React.useState(null);
  const [desc, setDesc] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [error, setError] = React.useState({});

  const [showList, setShowList] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const statusList = useSelector(statusStateSelector);
  const user = useSelector(userStateSelector);

  const duplicate_activity = useSelector(duplicateActivityStateSelector);
  const activitysAll = useSelector(activityStateSelector);

  const useRefIsSelectedTitle = React.useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(statusList, status);

  React.useEffect(() => {
    return () => {
      dispatch(setDuplicateActivity(null));
    };
  }, []);

  const filterOptions = React.useMemo(() => {
    return activitysAll
      .filter(({ title: titleAct }) => {
        return titleAct.toLowerCase().includes(title.toLowerCase());
      })
      .map((activity) => {
        return {
          id: activity.id,
          label: activity.title,
          activity,
        };
      });
  }, [title]);

  React.useEffect(() => {
    if (!duplicate_activity) {
      return;
    }
    const { title, desc, status_id, created, updated, user_id, priority } =
      duplicate_activity;

    setTitle(title + " [ " + moment().format("DD-MM-YYYY") + " ]");

    setDesc(desc);
    setPriority(priority);
  }, [duplicate_activity]);

  React.useEffect(() => {
    if (!activitySelected) {
      return;
    }
    const { title, desc, status_id, created, updated, user_id, priority } =
      activitySelected.activity;

    setTitle(title);

    setDesc(desc);
    setPriority(priority);
  }, [activitySelected]);

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

    const activity = {
      title, desc, created: moment().toString(), updated: moment().toString(), priority,
      status_id: status,
      id:uuidv4(), 
    };
    try {
      setLoading(true);
      // const { data: activity } = await axios.post("activity/activity/", body);
      // console.log(activity);
      dispatch(addActivityAction(activity));
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
          <h1>Create Activity</h1>
          <SearchDropdown
            label="Title"
            onSelect={(option) => {
              setActivitySelected(option);
              setShowList(false);
            }}
            inputValue={title}
            onInputChange={(e) => {
              setShowList(true);
              onChange(e, "title");
            }}
            onBlur={() => {
              setTimeout(() => {
                setShowList(false);
              }, [1500]);
            }}
            filterOptions={filterOptions}
            showList={showList}
            required
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
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              required
              label="Priority"
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
