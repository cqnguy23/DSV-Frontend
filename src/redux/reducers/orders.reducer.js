import moment from "moment";
import formatUtils from "../../utils/formatUtils";
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
    case types.UPDATE_ORDER_REQUEST:
      return { ...state, loading: true };

    case types.GET_ORDERS_FAILURE:
    case types.UPDATE_ORDER_FAILURE:
      return { ...state, loading: false };

    case types.GET_ORDERS_SUCCESS:
      const orders = payload.orders.map((order) => {
        const date = formatUtils.convertToCalendarDate(order.createdAt);
        return { ...order, convertedDate: date };
      });
      return {
        ...state,
        orders: orders,
        totalOrders: payload.totalOrders,
        loading: false,
      };
    case types.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order._id === payload._id) {
            return { ...order, status: payload.status };
          } else {
            return order;
          }
        }),
        loading: false,
      };

    default:
      return state;
  }
};

export default orderReducer;
