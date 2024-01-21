import axios from "axios";
import ls from "localstorage-slim";

console.log(process.env.NODE_ENV, process.env);
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8000/";
} else {
  console.log = () => {};
  axios.defaults.baseURL = "https://rrajpurohit0068.pythonanywhere.com/";
}

axios.interceptors.request.use(function (config) {
  const token = ls.get("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
