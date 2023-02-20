import { default as axios } from "../../helpers/axios";
import { categoryConstans } from "../constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstans.GET_ALL_CATEGORIES_REQUEST });
    const res = await axios.get("/category/get-categories");
    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstans.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstans.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstans.ADD_NEW_CATEGORY_REQUEST });
    const res = await axios.post("/category/create", form);
    if (res.status === 201) {
      dispatch({
        type: categoryConstans.ADD_NEW_CATEGORY_SUCCESS,
        payload: { category: res.data.cat },
      });
    } else {
      dispatch({
        type: categoryConstans.ADD_NEW_CATEGORY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
