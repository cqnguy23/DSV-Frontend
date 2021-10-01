import * as types from "../constants/admin.constant.js";
import api from "../../api";
const initialAdmin = localStorage.getItem("loggedInAdmin");
let token = localStorage.getItem("adminToken");

const initialState = initialAdmin
  ? JSON.parse(initialAdmin)
  : {
      name: "",
      email: "",
      isLoggedIn: false,
      loading: false,
      role: "",
    };
if (token) {
  token = JSON.parse(token);
  api.defaults.headers.common["adminAuthorization"] = "Bearer " + token;
}
const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.ADMIN_LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.ADMIN_LOGIN_SUCCESS:
      const loggedInAdmin = {
        ...state,
        name: payload.name,
        email: payload.email,
        isLoggedIn: true,
        loading: false,
        role: payload.role,
      };
      localStorage.setItem("loggedInAdmin", JSON.stringify(loggedInAdmin));
      localStorage.setItem("adminToken", JSON.stringify(payload.accessToken));
      return loggedInAdmin;
    case types.ADMIN_LOGIN_FAILURE:
      return { ...state, loading: false };

    case types.ADMIN_LOGOUT_REQUEST:
      return { ...state, loading: true };
    case types.ADMIN_LOGOUT_SUCCESS:
      localStorage.removeItem("loggedInAdmin");
      localStorage.removeItem("adminToken");
      return {
        ...state,
        name: "",
        email: "",
        isLoggedIn: false,
        loading: false,
        role: "",
      };
    case types.ADMIN_LOGOUT_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default adminReducer;
