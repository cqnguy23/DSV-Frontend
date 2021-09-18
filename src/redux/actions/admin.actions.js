import * as types from "../constants/admin.constant.js";
import api from "../../api";
import toastAction from "../../toastAction";
const adminActions = {};

adminActions.login = (email, password) => async (dispatch) => {
  dispatch({ type: types.ADMIN_LOGIN_REQUEST, payload: null });
  try {
    let url = "/auth/admin/login";
    const resp = await api.post(url, {
      email,
      password,
    });
    let user = await resp.data.user;
    user.accessToken = await resp.data.accessToken;
    dispatch({ type: types.ADMIN_LOGIN_SUCCESS, payload: user });
    api.defaults.headers.common["adminAuthorization"] =
      "Bearer " + user.accessToken;
  } catch (err) {
    console.log({ err });
    dispatch({ type: types.ADMIN_LOGIN_FAILURE, payload: null });
    toastAction.error(err.response?.data);
  }
};
adminActions.logout = () => async (dispatch) => {
  dispatch({ type: types.ADMIN_LOGOUT_REQUEST, payload: null });

  try {
    const token = api.defaults.headers.common["adminAuthorization"].replace(
      "Bearer ",
      ""
    );
    const url = "/auth/logout";
    const resp = await api.post(url, {
      token,
    });
    const message = resp.data;
    console.log("message", message);
    delete api.defaults.headers.common["adminAuthorization"];

    dispatch({ type: types.ADMIN_LOGOUT_SUCCESS, payload: null });
  } catch (err) {
    dispatch({ type: types.ADMIN_LOGOUT_FAILURE, payload: err });
  }
};
export default adminActions;
