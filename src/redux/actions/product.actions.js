import { default as axios } from "../../helpers/axios";
import { productConstants } from "../constants";

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCTS_BY_SLUG_REQUEST });
    let res;
    try {
      res = await axios.get(`/products/${slug}`);
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getProductPage = (payload) => {
  const { cid, type } = payload;
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
    const res = await axios.get(`/page/${cid}/${type}`);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
        payload: { page: res.data.page },
      });
    } else {
      dispatch({
        type: productConstants.GET_PRODUCT_PAGE_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getProductDetailsById = (productId) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCTS_DETAILS_BY_ID_REQUEST });
    let res;
    try {
      res = await axios.get(`/product/${productId}`);
      console.log(res);
      dispatch({
        type: productConstants.GET_PRODUCTS_DETAILS_BY_ID_SUCCESS,
        payload: { productDetails: res.data.product },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE,
        payload: res.data.error,
      });
    }
  };
};
