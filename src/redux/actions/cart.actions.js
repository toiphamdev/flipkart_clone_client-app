import { default as axios } from "../../helpers/axios";
import { cartConstants } from "../constants";
import store from "../store";
export const addToCart = (product, qtyAdd = 1) => {
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();
    const qty =
      cartItems[product._id] && cartItems[product._id].qty
        ? parseInt(cartItems[product._id].qty + qtyAdd)
        : 1;
    cartItems[product._id] = {
      ...product,
      qty,
    };
    const cartItemArr = Object.keys(cartItems).map((key) => {
      return {
        quantity: cartItems[key].qty,
        product: cartItems[key]._id,
      };
    });
    if (auth.authenticate) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      console.log(cartItemArr);
      const payload = {
        cartItems: [...cartItemArr],
      };
      const res = await axios.post("/user/cart/add-to-cart", payload);
      console.log(res);
      if (res.status === 201) {
        dispatch(getCartItems());
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: {
        cartItems: cartItems,
      },
    });
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    const { auth } = store.getState();

    const cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {};
    if (auth.authenticate) {
      // localStorage.removeItem("cart");
      dispatch(getCartItems());
      if (cartItems) {
        const payload = {
          cartItems: Object.keys(cartItems).map((key) => {
            return {
              quantity: cartItems[key].qty,
              product: cartItems[key]._id,
            };
          }),
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await axios.post("/user/cart/add-to-cart", payload);
          if (res.status === 201) {
            dispatch(getCartItems());
          }
        }
      }
    } else {
      if (cartItems) {
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
      }
    }
  };
};

export const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await axios.get("/user/cart/get-cart-items");
      if (res.status === 200) {
        const { cartItems, _id } = res.data;
        console.log(cartItems);
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems, _id },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
      const { cartId, productId } = payload;
      console.log("cart id", cartId);
      if (cartId) {
        const res = await axios.post(`/user/cart/remove-cart-item`, {
          payload,
        });
        if (res.status === 202) {
          dispatch({
            type: cartConstants.REMOVE_CART_ITEM_SUCCESS,
            payload: {},
          });
          dispatch(getCartItems());
        } else {
          const { error } = res.data;
          dispatch({
            type: cartConstants.REMOVE_CART_ITEM_FAILURE,
            payload: { error },
          });
        }
      } else {
        dispatch({
          type: cartConstants.REMOVE_CART_ITEM_SUCCESS,
          payload: { productId },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
