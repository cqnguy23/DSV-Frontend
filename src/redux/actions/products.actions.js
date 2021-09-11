import api from "../../api";
import * as types from "../constants/products.constant";
const productActions = {};
productActions.getProducts = (page, limit, gender) => async (dispatch) => {
  dispatch({ type: types.GET_WOMEN_PRODUCTS_REQUEST, payload: null });
  try {
    let url = "/products/category/" + gender;
    if (page) {
      url += `?page=${page}`;
    }
    if (limit) {
      url += `&limit=${limit}`;
    }
    const resp = await api.get(url);
    const data = await resp.data;
    data.page = page;
    dispatch({ type: types.GET_WOMEN_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: types.GET_WOMEN_PRODUCTS_FAILURE, payload: err });
  }
};

productActions.getSingleProduct = (id) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_PRODUCT_REQUEST, payload: null });
  try {
    let url = "/products/" + id;
    const resp = await api.get(url);
    const data = resp.data;
    dispatch({ type: types.GET_SINGLE_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: types.GET_SINGLE_PRODUCT_FAILURE, payload: err });
  }
};

export default productActions;
