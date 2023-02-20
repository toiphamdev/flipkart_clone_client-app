import { cartConstants } from "../constants";

const initState = {
  cartItems: {},
  _id: "",
  updatingCart: false,
  error: null,
};

const cartReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST: {
      let stateCoppy = {
        ...state,
        updatingCart: true,
      };
      return stateCoppy;
    }
    case cartConstants.ADD_TO_CART_SUCCESS: {
      let stateCoppy = {
        ...state,
        cartItems: action.payload.cartItems,
        _id: action.payload._id,
        updatingCart: false,
      };
      return stateCoppy;
    }
    case cartConstants.ADD_TO_CART_FAILURE: {
      let stateCoppy = {
        ...state,
        updatingCart: false,
        error: action.payload.error,
      };
      return stateCoppy;
    }
    case cartConstants.RESET_CART: {
      let stateCoppy = { ...initState };
      return stateCoppy;
    }

    case cartConstants.REMOVE_CART_ITEM_REQUEST: {
      let stateCoppy = {
        ...state,
        updatingCart: true,
      };
      return stateCoppy;
    }
    case cartConstants.REMOVE_CART_ITEM_SUCCESS: {
      let stateCoppy;
      stateCoppy = {
        ...state,
        updatingCart: false,
      };
      if (action.payload.productId) {
        delete stateCoppy.cartItems[action.payload.productId];
      }
      return stateCoppy;
    }
    case cartConstants.REMOVE_CART_ITEM_FAILURE: {
      let stateCoppy = {
        ...state,
        updatingCart: false,
        error: action.payload.error,
      };
      return stateCoppy;
    }

    default:
      break;
  }
  return state;
};

export default cartReducer;
