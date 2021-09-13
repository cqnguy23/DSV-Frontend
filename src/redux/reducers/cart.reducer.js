import * as types from "../constants/cart.constant";

const initialState = {
  products: [],
  totalAmount: 0,
  loading: false,
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.ADD_TO_CART_REQUEST:
      return { ...state, loading: true };
    case types.ADD_TO_CART_FAILURE:
      return { ...state, loading: true };
    case types.ADD_TO_CART_SUCCESS:
      return { ...state, products: [...state.products, payload] };

    default:
      return state;
  }
};

export default cartReducer;
