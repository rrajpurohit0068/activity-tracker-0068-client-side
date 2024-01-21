import { get } from "lodash";
import ls from "localstorage-slim";

const initialState = {
  login: ls.get("login"),
  access: ls.get("access"),
  isLogin: ls.get("login") && ls.get("access"),
  user: ls.get("user"),
};

const SET_LOGIN_TOKEN = "loginToken/SET_LOGIN_TOKEN";
export const setLoginTokenAction = (login, user) => {
  return {
    type: SET_LOGIN_TOKEN,
    login,
    user,
  };
};

export const userStateSelector = (state) =>
  get(state, "loginTokenReducer.user") || {};

export const isLoginStateSelector = (state) =>
  get(state, "loginTokenReducer.isLogin") || false;

export const loginTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_TOKEN: {
      const { login, user } = action;
      return {
        ...state,
        login,
        access: get(login, "access"),
        isLogin: login && get(login, "access"),
        user: user,
      };
    }
    default:
      return state;
  }
};
