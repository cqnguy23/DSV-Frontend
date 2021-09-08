import api from "../../api";
import * as types from "../constants/products.constant";

const getAllProducts = (page, limit) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_PRODUCTS_REQUEST, payload: null });
  try {
    let url = "/products";
    if (page) {
      url += `?page=${page}`;
    }
    if (limit) {
      url += `&limit=${limit}`;
    }
    const resp = await api.get(url);
    const data = resp.data;
    console.log(data);
    dispatch({ type: types.GET_ALL_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: types.GET_ALL_PRODUCTS_FAILURE, payload: err });
  }
};

const getSingleProduct = (id) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_PRODUCT_REQUEST, payload: null });
  try {
    let url = "/products/" + id;

    const resp = await api.get(url);
    const data = resp.data;
    console.log(data);
    dispatch({ type: types.GET_SINGLE_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: types.GET_SINGLE_PRODUCT_FAILURE, payload: err });
  }
};

export const productsAction = {
  getAllProducts,
  getSingleProduct,
};
