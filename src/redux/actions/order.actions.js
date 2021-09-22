import api from "../../api";
import * as types from "../constants/order.constant";
import toastAction from "../../toastAction";
import adminActions from "./admin.actions";

const orderActions = {};

const logOutWhenTokenExpired = (res, dispatch) => {
  const errMsg = res?.data;
  toastAction.error(errMsg);
  if (errMsg.toLowerCase().includes("log in")) {
    dispatch(adminActions.logout());
  }
};
orderActions.getOrders =
  (page, limit, startDate, endDate, search) => async (dispatch) => {
    dispatch({ type: types.GET_ORDERS_REQUEST, payload: null });
    try {
      let url = "/order";
      if (page) {
        url += `?page=${page}`;
      }
      if (limit) {
        url += `&limit=${limit}`;
      }
      if (startDate && endDate) {
        url += "&startDate=" + startDate;
        url += "&endDate=" + endDate;
      }
      if (search) {
        url += "&search=" + search;
      }
      const resp = await api.get(url);
      const data = await resp.data;
      dispatch({ type: types.GET_ORDERS_SUCCESS, payload: data });
    } catch (err) {
      console.log({ err });
      if (err.response) {
        logOutWhenTokenExpired(err.response, dispatch);
      }
      dispatch({ type: types.GET_ORDERS_FAILURE, payload: err });
    }
  };

orderActions.updateOrder = (id, status) => async (dispatch) => {
  dispatch({ type: types.UPDATE_ORDER_REQUEST, payload: null });
  try {
    let url = "/order";
    if (id) url += "/" + id;
    if (status) url += "?status=" + status;
    const resp = await api.patch(url);
    const data = await resp.data;
    const order = await data.order;
    console.log({ order });
    dispatch({ type: types.UPDATE_ORDER_SUCCESS, payload: order });
    toastAction.success("Order status updated.");
  } catch (err) {
    dispatch({ type: types.UPDATE_ORDER_FAILURE, payload: err });
    if (err.response) {
      logOutWhenTokenExpired(err.response, dispatch);
    }
    toastAction.error(err);
  }
};

export default orderActions;
