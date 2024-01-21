import { findIndex, get } from "lodash";
import ls from "localstorage-slim";
import { status } from '../../api/status'

const initialState = {
  status: status,
};

const set_status = "status/set_status";
export const setStatusAction = (status) => {
  return {
    type: set_status,
    status,
  };
};

export const statusStateSelector = (state) =>
  get(state, "statusReducer.status") || [];

export const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case set_status: {
      const { status } = action;

      return {
        status: status.sort((a, b) => a.sr_no - b.sr_no),
      };
    }
    default:
      return state;
  }
};
