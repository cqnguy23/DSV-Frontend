import * as types from "../constants/user.constants";
import api from "../../api";
import { toast } from "react-toastify";
import toastAction from "../../toastAction";
const userActions = {};

userActions.login =
  (email, password, setIsLogInModalVisible) => async (dispatch) => {
    dispatch({ type: types.USER_LOGIN_REQUEST, payload: null });
    try {
      const url = "/auth/login";
      const resp = await api.post(url, {
        email,
        password,
      });
      const user = await resp.data.user;
      const accessToken = await resp.data.accessToken;
      dispatch({ type: types.USER_LOGIN_SUCCESS, payload: user });
      api.defaults.headers.common["authorization"] = "Bearer " + accessToken;
      toastAction.success("Login Success!");
      setIsLogInModalVisible(false);
    } catch (err) {
      dispatch({ type: types.USER_LOGIN_FAILURE, payload: null });
      toastAction.error(err);
    }
  };

userActions.resgister =
  (email, password, name, setIsRegisterModalVisible) => async (dispatch) => {
    dispatch({ type: types.USER_REGISTER_REQUEST, payload: null });
    try {
      let url = "/auth/register";
      const resp = await api.post(url, {
        email,
        password,
        name,
      });
      const user = await resp.data.user;
      const accessToken = await resp.data.accessToken;
      dispatch({ type: types.USER_REGISTER_SUCCESS, payload: user });
      api.defaults.headers.common["authorization"] = "Bearer " + accessToken;

      toastAction.success("Registration Success!");

      setIsRegisterModalVisible(false);
      // console.log(user);
    } catch (err) {
      console.log({ err });
      dispatch({ type: types.USER_REGISTER_FAILURE, payload: err });
      toastAction.error("Registration Failed!");
    }
  };

userActions.logout = () => (dispatch) => {
  dispatch({ type: types.USER_LOGOUT_REQUEST, payload: null });

  try {
    dispatch({ type: types.USER_LOGOUT_SUCCESS, payload: null });
    toastAction.success("Log out successfully!");
  } catch (err) {
    dispatch({ type: types.USER_LOGOUT_FAILURE, payload: err });
  }
};
export default userActions;
