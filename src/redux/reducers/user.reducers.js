const { userConstants } = require("../constants");

const initState = {
  address: [],
  orders: [],
  orderDetails: {},
  error: null,
  loading: false,
  orderFetching: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_USER_ADDRESS_REQUEST: {
      let stateCoppy = {
        ...state,
        loading: true,
      };
      return stateCoppy;
    }
    case userConstants.GET_USER_ADDRESS_SUCCESS: {
      let stateCoppy = {
        ...state,
        address: action.payload.address,
        loading: false,
      };
      return stateCoppy;
    }
    case userConstants.GET_USER_ADDRESS_FAILURE: {
      let stateCoppy = {
        ...state,
        loading: false,
      };
      return stateCoppy;
    }
    case userConstants.ADD_USER_ADDRESS_REQUEST: {
      let stateCoppy = {
        ...state,
        loading: true,
      };
      return stateCoppy;
    }
    case userConstants.ADD_USER_ADDRESS_SUCCESS: {
      let stateCoppy = {
        ...state,
        address: [...state.address, action.payload.address],
        loading: false,
      };
      return stateCoppy;
    }
    case userConstants.ADD_USER_ADDRESS_FAILURE: {
      let stateCoppy = {
        ...state,
        loading: false,
      };
      return stateCoppy;
    }
    case userConstants.GET_USER_ORDER_REQUEST: {
      let stateCoppy = {
        ...state,
        orderFetching: true,
      };
      return stateCoppy;
    }
    case userConstants.GET_USER_ORDER_SUCCESS: {
      let stateCoppy = {
        ...state,
        orders: action.payload.orders,
        orderFetching: false,
      };
      return stateCoppy;
    }
    case userConstants.GET_USER_ORDER_FAILURE: {
      let stateCoppy = {
        ...state,
        orderFetching: false,
      };
      return stateCoppy;
    }

    case userConstants.GET_USER_ORDER_DETAILS_REQUEST: {
      let stateCoppy = {
        ...state,
        orderFetching: true,
      };
      return stateCoppy;
    }
    case userConstants.GET_USER_ORDER_DETAILS_SUCCESS: {
      let stateCoppy = {
        ...state,
        orderDetails: action.payload.order,
        orderFetching: false,
      };
      return stateCoppy;
    }
    case userConstants.GET_USER_ORDER_DETAILS_FAILURE: {
      let stateCoppy = {
        ...state,
        orderFetching: false,
      };
      return stateCoppy;
    }

    default:
      break;
  }
  return state;
};

export default userReducer;
