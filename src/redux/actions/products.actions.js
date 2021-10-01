import api from "../../api";
import toastAction from "../../toastAction";
import * as types from "../constants/products.constant";
const productActions = {};
productActions.getProducts =
  ({
    role,
    page,
    limit,
    gender,
    sortType,
    searchKey,
    category,
    sizes,
    colors,
    brands,
  }) =>
  async (dispatch) => {
    dispatch({ type: types.GET_PRODUCTS_REQUEST, payload: null });
    try {
      let url = "/products";
      if (role === "admin") {
        url += "/admin";
      } else {
        url += "/gender/" + gender;
      }
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
      if (category && category !== "none") {
        url += `&category=${category}`;
      }
      if (sizes) {
        const size = sizes.filter((i) => i).join(",");
        url += `&size=${size}`;
      }
      if (colors) {
        const color = colors.filter((i) => i).join(",");
        url += `&color=${color}`;
      }
      if (brands) {
        const brand = brands.filter((i) => i).join(",");
        url += `&brand=${brand}`;
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
    dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: data });
    toastAction.success("Product deleted succesfully.");
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

    dispatch({ type: types.EDIT_PRODUCT_SUCCESS, payload: data });
    toastAction.success("Product quantity updated.");
  } catch (err) {
    dispatch({ type: types.EDIT_PRODUCT_FAILURE, payload: err });
  }
};
productActions.getCategories = (gender) => async (dispatch) => {
  dispatch({ type: types.GET_CATEGORIES_REQUEST, payload: null });
  try {
    gender = gender || "all";
    let url = "/category/" + gender;

    const resp = await api.get(url);
    const data = await resp.data;
    dispatch({ type: types.GET_CATEGORIES_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: types.GET_CATEGORIES_FAILURE, payload: err });
  }
};

productActions.addProduct = (product) => async (dispatch) => {
  dispatch({ type: types.ADD_PRODUCT_REQUEST, payload: null });
  try {
    let url = "/products";
    const resp = await api.post(url, product);
    const data = await resp.data;
    dispatch({ type: types.ADD_PRODUCT_SUCCESS, payload: data });
    toastAction.success("Product added!");
  } catch (err) {
    dispatch({ type: types.ADD_PRODUCT_FAILURE, payload: err });
  }
};

productActions.importProducts = (products) => async (dispatch) => {
  dispatch({ type: types.IMPORT_PRODUCT_REQUEST, payload: null });
  try {
    const resp = await api.patch("/products/", { products: products });
    const updatedProducts = await resp.data.products;
    dispatch({ type: types.IMPORT_PRODUCT_SUCCESS, payload: updatedProducts });
    toastAction.success("Products updated!");
  } catch (err) {
    console.log(err);
    dispatch({ type: types.IMPORT_PRODUCT_FAILURE, payload: err });
  }
};

productActions.addReview =
  ({ productID, review }) =>
  async (dispatch) => {
    dispatch({ type: types.ADD_REVIEW_REQUEST, payload: null });
    try {
      let url = "/review/" + productID;
      const resp = await api.post(url, review);
      const data = await resp.data;
      dispatch({ type: types.ADD_REVIEW_SUCCESS, payload: data });
      toastAction.success("Review added!");
    } catch (err) {
      console.log({ err });
      dispatch({ type: types.ADD_REVIEW_FAILURE, payload: err });
      toastAction.error(err.response.data);
    }
  };
export default productActions;
