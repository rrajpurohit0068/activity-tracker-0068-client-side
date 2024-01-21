import { combineReducers } from "redux";
import { loginTokenReducer } from "./loginToken";
import { commmentReducer } from "./comment";
import { activityReducer } from "./activity";
import { statusReducer } from "./status";

export const appReducer = combineReducers({
  loginTokenReducer,
  commmentReducer,
  activityReducer,
  statusReducer,
});
