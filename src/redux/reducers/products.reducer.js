import * as types from "../constants/products.constant";

const initialState = {
  data: [],
  loading: false,
  selectedProduct: { product: {}, quantity: 0 },
  cartProducts: [],
  gender: "",
  total: 0,
  page: 1,
};

const productsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PRODUCTS_REQUEST:
    case types.GET_SINGLE_PRODUCT_REQUEST:
    case types.DELETE_PRODUCT_REQUEST:
    case types.EDIT_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case types.GET_PRODUCTS_FAILURE:
    case types.GET_SINGLE_PRODUCT_FAILURE:
    case types.DELETE_PRODUCT_FAILURE:
    case types.EDIT_PRODUCT_FAILURE:
      return { ...state, loading: false };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.products,
        total: payload.numsTotal,
        page: payload.page,
        gender: payload.gender,
      };

    case types.GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProduct: {
          product: payload.product,
          quantity: payload.quantity,
        },
      };
    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((product) => product._id !== payload._id),
      };
    case types.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((product) => {
          if (product._id === payload._id) {
            return { ...product, size: payload.size };
          } else return product;
        }),
      };
    default:
      return state;
  }
};

export default productsReducer;
