import api from "../../api";
import * as types from "../constants/products.constant";
const productActions = {};
productActions.getProducts =
  (page, limit, gender, sortType, searchKey) => async (dispatch) => {
    dispatch({ type: types.GET_PRODUCTS_REQUEST, payload: null });
    try {
      let url = "/products/gender/" + gender;
      if (page) {
        url += `?page=${page}`;
      }
      if (limit) {
        url += `&limit=${limit}`;
      }
      if (sortType) {
        url += `&sortBy=${sortType}`;
      }
      if (searchKey) {
        url += `&search=${searchKey}`;
      }
      const resp = await api.get(url);
      const data = await resp.data;
      data.page = page;
      data.gender = gender;
      dispatch({ type: types.GET_PRODUCTS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: types.GET_PRODUCTS_FAILURE, payload: err });
    }
  };

productActions.getSingleProduct = (id) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_PRODUCT_REQUEST, payload: null });
  try {
    let url = "/products/" + id;
    const resp = await api.get(url);
    const data = await resp.data;
    dispatch({ type: types.GET_SINGLE_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: types.GET_SINGLE_PRODUCT_FAILURE, payload: err });
  }
};

productActions.deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST, payload: null });
  try {
    let url = "/products/" + id;
    const resp = await api.delete(url);
    const data = await resp.data;
    console.log("delete", data);
    dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: err });
  }
};

productActions.editProduct = (id, size) => async (dispatch) => {
  dispatch({ type: types.EDIT_PRODUCT_REQUEST, payload: null });
  try {
    let url = "/products/" + id;
    const resp = await api.patch(url, {
      size,
    });
    const data = await resp.data;
    console.log("edit", data);

    dispatch({ type: types.EDIT_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: types.EDIT_PRODUCT_FAILURE, payload: err });
  }
};

export default productActions;
