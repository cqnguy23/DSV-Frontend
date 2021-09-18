import * as types from "../constants/user.constant.js";
import api from "../../api";
const initialUser = localStorage.getItem("loggedInUser");
let token = localStorage.getItem("token");

const initialState = initialUser
  ? JSON.parse(initialUser)
  : {
      name: "",
      email: "",
      isLoggedIn: false,
      loading: false,
      cart: [],
      role: "",
    };
if (token) {
  token = JSON.parse(token);
  api.defaults.headers.common["authorization"] = "Bearer " + token;
}
const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.USER_REGISTER_SUCCESS:
      return {
        ...state,
        name: payload.name,
        email: payload.email,
        isLoggedIn: true,
        loading: false,
      };
    case types.USER_REGISTER_FAILURE:
      return { ...state, loading: false };

    case types.USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.USER_LOGIN_SUCCESS:
      const loggedInUser = {
        ...state,
        name: payload.name,
        email: payload.email,
        isLoggedIn: true,
        loading: false,
        role: payload.role,
      };
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      localStorage.setItem("token", JSON.stringify(payload.accessToken));
      return loggedInUser;
    case types.USER_LOGIN_FAILURE:
      return { ...state, loading: false };

    case types.USER_LOGOUT_REQUEST:
      console.log("Logged out");
      return { ...state, loading: true };
    case types.USER_LOGOUT_SUCCESS:
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("token");
      return {
        ...state,
        name: "",
        email: "",
        isLoggedIn: false,
        loading: false,
        cart: [],
        role: "",
      };
    case types.USER_LOGOUT_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default userReducer;
