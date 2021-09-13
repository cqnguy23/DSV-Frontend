import toastAction from "../../toastAction";
import * as types from "../constants/cart.constant";
const cartActions = {};
cartActions.addToCart = (product) => async (dispatch) => {
  dispatch({ type: types.ADD_TO_CART_REQUEST, payload: null });
  try {
    dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: product });
    toastAction.success("Added to cart.");
  } catch (err) {
    dispatch({ type: types.ADD_TO_CART_FAILURE, payload: err });
    toastAction.error(err);
  }
};
export default cartActions;
