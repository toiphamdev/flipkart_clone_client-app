import { default as axios } from "../../helpers/axios";
import { cartConstants, userConstants } from "../constants";
import store from "../store";

export const getAddress = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
      const res = await axios.get("/user/address/get-user-address");
      if (res.status === 200) {
        const {
          userAddress: { address },
        } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;

        dispatch({
          type: userConstants.GET_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAddress = (userAddress) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
      const res = await axios.post("/user/address/create", userAddress);
      if (res.status === 201) {
        const {
          address: { address },
        } = res.data;

        dispatch({
          type: userConstants.ADD_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
        getAddress();
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addOrder = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });
      const res = await axios.post("/user/order/add-order", payload);
      if (res.status === 201) {
        console.log(res);
        dispatch({ type: cartConstants.RESET_CART });
        // dispatch({
        //   type: userConstants.ADD_USER_ADDRESS_SUCCESS,
        //   payload: { address },
        // });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrders = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });
      const res = await axios.get("/user/order/get-orders", payload);
      if (res.status === 200) {
        const { orders } = res.data;

        dispatch({
          type: userConstants.GET_USER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrder = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });
      const res = await axios.get(
        `/user/order/get-order/${payload.orderId}`,
        payload
      );
      if (res.status === 200) {
        const { order } = res.data;

        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
          payload: { order },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
