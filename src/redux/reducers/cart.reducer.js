import * as types from "../constants/cart.constant";
/*
const addedProduct = {
      id: product._id,
      name: product.name,
      quantity: selectedQuantity,
      size: size,
      price: product.price,
      totalPrice: price * quantity,
      imgURL: product.imgURL[0],
      color: product.color,
      maxQuantity: currentQuantity,
    };
*/
const initialState = {
  products: [],
  totalAmount: "0",
  loading: false,
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.ADD_TO_CART_REQUEST:
    case types.DELETE_CART_ITEM_REQUEST:
    case types.EDIT_CART_REQUEST:
    case types.SUBMIT_ORDER_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_CART_ITEM_FAILURE:
    case types.ADD_TO_CART_FAILURE:
    case types.EDIT_CART_FAILURE:
    case types.SUBMIT_ORDER_FAILURE:
      return { ...state, loading: false };

    case types.ADD_TO_CART_SUCCESS:
      console.log("total price", payload.totalPrice);
      console.log("state amount", state.totalAmount);
      console.log(typeof state.totalAmount, "typeState");
      console.log(typeof payload.totalPrice, "typePayload");
      const totalAmount = (
        parseFloat(state.totalAmount) + parseFloat(payload.totalPrice)
      ).toFixed(2);
      return {
        ...state,
        products: [...state.products, payload],
        totalAmount: totalAmount,
      };
    case types.DELETE_CART_ITEM_SUCCESS:
      let tempProduct;
      const postProducts = state.products.filter((product) => {
        if (product.id === payload) tempProduct = product;
        return product.id !== payload;
      });
      return {
        ...state,
        products: postProducts,
        totalAmount:
          parseFloat(state.totalAmount) - parseFloat(tempProduct.totalPrice),
      };
    case types.EDIT_CART_SUCCESS:
      console.log(payload.productID);
      let updatedTotalAmount = parseFloat(state.totalAmount);
      const updatedProducts = state.products.map((product) => {
        if (product.id === payload.productID) {
          if (payload.quantity > product.quantity) {
            updatedTotalAmount +=
              (payload.quantity - product.quantity) * product.price;
          } else if (payload.quantity < product.quantity) {
            updatedTotalAmount -=
              (product.quantity - payload.quantity) * product.price;
          }
          return {
            ...product,
            quantity: payload.quantity,
            totalPrice: (payload.quantity * product.price).toFixed(2),
          };
        } else return product;
      });
      console.log(updatedTotalAmount);
      updatedTotalAmount = updatedTotalAmount.toFixed(2);
      return {
        ...state,
        products: updatedProducts,
        totalAmount: updatedTotalAmount,
      };
    case types.SUBMIT_ORDER_SUCCESS:
      console.log("Here");
      return {
        ...state,
        totalAmount: "0",
        products: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
