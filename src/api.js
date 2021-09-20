import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    console.log("Request Error", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (req) => {
    return req;
  },
  (error) => {
    console.log("Request Error", error);
    return Promise.reject(error);
  }
);
export default api;
