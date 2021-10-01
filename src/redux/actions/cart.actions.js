import api from "../../api";
import toastAction from "../../toastAction";
import * as types from "../constants/cart.constant";
const cartActions = {};
cartActions.addToCart = (product) => async (dispatch) => {
  dispatch({ type: types.ADD_TO_CART_REQUEST, payload: null });
  try {
    dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: product });
  } catch (err) {
    dispatch({ type: types.ADD_TO_CART_FAILURE, payload: err });
    toastAction.error(err);
  }
};
cartActions.submitOrder = (products, totalAmount) => async (dispatch) => {
  dispatch({ type: types.SUBMIT_ORDER_REQUEST, payload: null });
  try {
    const url = "/order";
    const res = await api.post(url, {
      products: products,
      totalPrice: totalAmount,
    });
    const order = await res.data;
    dispatch({ type: types.SUBMIT_ORDER_SUCCESS, payload: order });
    toastAction.success("Ordered Placed Successfully");
  } catch (err) {
    dispatch({ type: types.SUBMIT_ORDER_FAILURE, payload: err });
    toastAction.error(err.response.data);
  }
};
cartActions.removeItem = (productID, size) => async (dispatch) => {
  dispatch({ type: types.DELETE_CART_ITEM_REQUEST, payload: null });
  try {
    const data = { productID, size };
    dispatch({ type: types.DELETE_CART_ITEM_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: types.DELETE_CART_ITEM_FAILURE, payload: err });
    toastAction.error(err);
  }
};

cartActions.updateItem = (productID, quantity, size) => async (dispatch) => {
  dispatch({ type: types.EDIT_CART_REQUEST, payload: null });
  try {
    const data = { productID, quantity, size };
    dispatch({ type: types.EDIT_CART_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: types.EDIT_CART_FAILURE, payload: err });
    toastAction.error(err);
  }
};
export default cartActions;
