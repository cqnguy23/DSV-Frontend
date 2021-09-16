import * as types from "../constants/order.constant";

const initialState = {
  orders: [],
  totalOrders: 0,
  loading: false,
};

const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ORDERS_REQUEST:
      return { ...state, loading: true };
    case types.GET_ORDERS_FAILURE:
      return { ...state, loading: false };
    case types.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload.orders,
        totalOrders: payload.totalOrders,
        loading: false,
      };

    default:
      return state;
  }
};

export default orderReducer;
