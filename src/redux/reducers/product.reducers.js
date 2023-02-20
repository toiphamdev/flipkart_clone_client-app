import { productConstants } from "../constants";

const initState = {
  products: [],
  productsByPrice: {
    under2m: [],
    under5m: [],
    under10m: [],
    under15m: [],
    under20m: [],
  },
  productDetails: {},
  page: {},
  error: null,
  loading: false,
  pageRequest: false,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG_REQUEST: {
      let stateCoppy = {
        ...state,
        loading: true,
      };
      return stateCoppy;
    }
    case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS: {
      let stateCoppy = {
        ...state,
        products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
        loading: false,
      };
      return stateCoppy;
    }

    case productConstants.GET_PRODUCTS_BY_SLUG_FAILURE: {
      let stateCoppy = {
        ...state,
        loading: false,
      };
      return stateCoppy;
    }
    case productConstants.GET_PRODUCT_PAGE_REQUEST: {
      let stateCoppy = {
        ...state,
        pageRequest: true,
      };
      return stateCoppy;
    }
    case productConstants.GET_PRODUCT_PAGE_SUCCESS: {
      let stateCoppy = {
        ...state,
        page: action.payload.page,
        pageRequest: false,
      };
      return stateCoppy;
    }
    case productConstants.GET_PRODUCT_PAGE_FAILURE: {
      let stateCoppy = {
        ...state,
        pageRequest: false,
      };
      return stateCoppy;
    }
    case productConstants.GET_PRODUCTS_DETAILS_BY_ID_REQUEST: {
      let stateCoppy = {
        ...state,
        loading: true,
      };
      return stateCoppy;
    }
    case productConstants.GET_PRODUCTS_DETAILS_BY_ID_SUCCESS: {
      let stateCoppy = {
        ...state,
        loading: false,
        productDetails: action.payload.productDetails,
      };
      return stateCoppy;
    }
    case productConstants.GET_PRODUCTS_DETAILS_BY_ID_FAILURE: {
      let stateCoppy = {
        ...state,
        loading: false,
      };
      return stateCoppy;
    }
    default:
      break;
  }
  return state;
};

export default productReducer;
