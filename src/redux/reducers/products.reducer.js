import * as types from "../constants/products.constant";

const initialState = {
  data: [],
  loading: false,
  selectedProduct: null,
  cartProducts: [],
};

const productsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case types.GET_ALL_PRODUCTS_SUCCESS:
      return { ...state, loading: false, data: payload };
    case types.GET_ALL_PRODUCTS_FAILURE:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default productsReducer;
