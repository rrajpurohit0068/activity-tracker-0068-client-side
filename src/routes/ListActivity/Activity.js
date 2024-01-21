import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setDuplicateActivity,
  setUpdateActivity,
} from "../../Provider/Redux/activity";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import DeleteIcon from '@mui/icons-material/Delete';
import { status_color } from "../../api/status_color";
import { removeActivityAction } from "../../Provider/Redux/activity";

const pm = {
  1: "High",
  2: "Moderate",
  3: "Low",
};

export const Activity = ({ activity, text_color, background_color }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { title, desc, status_id, created, updated, user_id, priority, id } =
    activity;
  const onClickUpdate = () => {
    dispatch(setUpdateActivity(activity));
    navigate("/update-activity");
  };
  const onClickCreate = () => {
    dispatch(setDuplicateActivity(activity));
    navigate("/create");
  };
  const onClickDelete = () => {
    dispatch( removeActivityAction(id))
  }
  return (
    <Card
      sx={{ minWidth: 275 }}
      style={{
        background: status_color[`${status_id}b`][`${priority}`],
        color: status_color[`${status_id}t`][`${priority}`],
      }}
    >
      <CardContent>
        <p>
          {title}
          {` ( ${pm[priority]} ) `}
          <Button
            style={{ marginLeft: "16px" }}
            onClick={onClickUpdate}
            size="small"
          >
            <EditIcon
              style={{ color: status_color[`${status_id}t`][`${priority}`] }}
            />
          </Button>
          <Button
            style={{ marginLeft: "16px" }}
            onClick={onClickCreate}
            size="small"
          >
            <ControlPointDuplicateIcon
              style={{ color: status_color[`${status_id}t`][`${priority}`] }}
            />
          </Button>
          <Button
            style={{ marginLeft: "16px" }}
            onClick={onClickDelete}
            size="small"
          >
            <DeleteIcon
              style={{ color: status_color[`${status_id}t`][`${priority}`] }}
            />
          </Button>
        </p>
        <p>{desc}</p>
      </CardContent>
    </Card>
  );
};
