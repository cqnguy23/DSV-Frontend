import * as types from "../constants/user.constants";
import api from "../../api";
import { toast } from "react-toastify";
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
      toast.success("Login Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLogInModalVisible(false);
    } catch (err) {
      dispatch({ type: types.USER_LOGIN_FAILURE, payload: null });
      toast.error(err.response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      toast.success("Registration Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsRegisterModalVisible(false);
      // console.log(user);
    } catch (err) {
      console.log({ err });
      dispatch({ type: types.USER_REGISTER_FAILURE, payload: err });
      toast.error(err.response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

userActions.logout = () => (dispatch) => {
  dispatch({ type: types.USER_LOGOUT_REQUEST, payload: null });

  try {
    dispatch({ type: types.USER_LOGOUT_SUCCESS, payload: null });
    toast.success("Logged Out Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err) {
    dispatch({ type: types.USER_LOGOUT_FAILURE, payload: err });
  }
};
export default userActions;
