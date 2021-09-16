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
const initialProducts = localStorage.getItem("cartProducts");
const initialTotalAmount = localStorage.getItem("totalAmount");
const localProducts = initialProducts ? JSON.parse(initialProducts) : [];
const localTotalAmount = initialTotalAmount
  ? JSON.parse(initialTotalAmount)
  : 0;
const initialState = {
  products: localProducts,
  totalAmount: localTotalAmount,
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
      const totalAmount = (
        parseFloat(state.totalAmount) + parseFloat(payload.totalPrice)
      ).toFixed(2);
      const addedState = {
        ...state,
        products: [...state.products, payload],
        totalAmount: totalAmount,
        loading: false,
      };
      localStorage.setItem("cartProducts", JSON.stringify(addedState.products));
      localStorage.setItem(
        "totalAmount",
        JSON.stringify(addedState.totalAmount)
      );
      return addedState;
    case types.DELETE_CART_ITEM_SUCCESS:
      let tempProduct;
      const postProducts = state.products.filter((product) => {
        if (product.id === payload) tempProduct = product;
        return product.id !== payload;
      });
      const deletedState = {
        ...state,
        products: postProducts,
        totalAmount: (
          parseFloat(state.totalAmount) - parseFloat(tempProduct.totalPrice)
        ).toFixed(2),
        loading: false,
      };
      localStorage.setItem(
        "cartProducts",
        JSON.stringify(deletedState.products)
      );
      localStorage.setItem(
        "totalAmount",
        JSON.stringify(deletedState.totalAmount)
      );
      const products = JSON.parse(localStorage.getItem("cartProducts"));
      if (products.length === 0) {
        localStorage.removeItem("cartProducts");
        localStorage.removeItem("totalAmount");
      }
      return deletedState;
    case types.EDIT_CART_SUCCESS:
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
            loading: false,
            quantity: payload.quantity,
            totalPrice: (payload.quantity * product.price).toFixed(2),
          };
        } else return product;
      });
      updatedTotalAmount = updatedTotalAmount.toFixed(2);
      const editedState = {
        ...state,
        products: updatedProducts,
        totalAmount: updatedTotalAmount,
      };
      localStorage.setItem(
        "cartProducts",
        JSON.stringify(editedState.products)
      );
      localStorage.setItem(
        "totalAmount",
        JSON.stringify(editedState.totalAmount)
      );
      return editedState;
    case types.SUBMIT_ORDER_SUCCESS:
      localStorage.removeItem("cartProducts");
      localStorage.removeItem("totalAmount");
      return {
        ...state,
        totalAmount: "0",
        products: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
