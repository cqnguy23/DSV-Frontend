import * as types from "../constants/products.constant";

const initialState = {
  data: [],
  loading: false,
  selectedProduct: {},
  cartProducts: [],
  total: 0,
  page: 1,
};

const productsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_WOMEN_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case types.GET_WOMEN_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.products,
        total: payload.numsTotal,
        page: payload.page,
      };
    case types.GET_WOMEN_PRODUCTS_FAILURE:
      return { ...state, loading: false };

    case types.GET_MEN_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case types.GET_MEN_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.products,
        total: payload.numsTotal,
        page: payload.page,
      };
    case types.GET_MEN_PRODUCTS_FAILURE:
      return { ...state, loading: false };

    case types.GET_SINGLE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case types.GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProduct: payload,
      };
    case types.GET_SINGLE_PRODUCT_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default productsReducer;
