import * as types from "../constants/user.constants";

const initialState = {
  name: "",
  email: "",
  isLoggedIn: false,
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
      };
    case types.USER_LOGIN_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default userReducer;
