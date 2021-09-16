import api from "../../api";
import * as types from "../constants/order.constant";

const orderActions = {};

orderActions.getOrders = () => async (dispatch) => {
  dispatch({ type: types.GET_ORDERS_REQUEST, payload: null });
  try {
    let url = "/order";
    // if (page) {
    //   url += `?page=${page}`;
    // }
    // if (limit) {
    //   url += `&limit=${limit}`;
    // }
    const resp = await api.get(url);
    const data = await resp.data;
    dispatch({ type: types.GET_ORDERS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: types.GET_ORDERS_FAILURE, payload: err });
  }
};
export default orderActions;
