import * as types from "../constants/user.constants";

const initialState = {
  name: "",
  email: "",
  isLoggedIn: false,
  loading: false,
  cart: [],
};

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
      return {
        ...state,
        name: payload.name,
        email: payload.email,
        isLoggedIn: true,
        loading: false,
      };
    case types.USER_LOGIN_FAILURE:
      return { ...state, loading: false };

    case types.USER_LOGOUT_REQUEST:
      console.log("Logged out");
      return { ...state, loading: true };
    case types.USER_LOGOUT_SUCCESS:
      return initialState;
    case types.USER_LOGOUT_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default userReducer;
