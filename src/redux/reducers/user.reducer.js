import * as types from "../constants/user.constant.js";
import api from "../../api";
import formatUtils from "../../utils/formatUtils.js";
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
      orders: [],
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
        orders: [],
      };
    case types.USER_LOGOUT_FAILURE:
      return { ...state, loading: false };

    case types.USER_GET_ORDER_REQUEST:
      return { ...state, loading: true };
    case types.USER_GET_ORDER_SUCCESS:
      const orders = payload.map((order) => {
        const date = formatUtils.convertToCalendarDate(order.createdAt);
        return { ...order, convertedDate: date };
      });
      return {
        ...state,
        loading: false,
        orders: orders,
      };
    case types.USER_GET_ORDER_FAILURE:
      return { ...state, loading: false };

    case types.USER_CANCEL_ORDER_REQUEST:
      return { ...state, loading: true };
    case types.USER_CANCEL_ORDER_SUCCESS:
      const deletedOrders = state.orders.map((order) => {
        if (payload._id === order._id) {
          return { ...order, status: "Cancelled" };
        } else return order;
      });
      return {
        ...state,
        loading: false,
        orders: deletedOrders,
      };
    case types.USER_CANCEL_ORDER_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default userReducer;
