import * as constants from "../constants/product";

let INIT_STATE = {
  listProducts: [],
  pageSize: 10,
  pageNumber: 1,
  totalResults: 0,
  disabledButton: false,
};

function ProductsReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case constants.GET_LIST_PRODUCT_REQUEST_START:
      return { ...state, disabledButton: true };

    case constants.GET_LIST_PRODUCT_REQUEST_SUCCEEDED:
      return {
        ...state,
        listProducts: action.data,
        pageSize: action.pageSize,
        pageNumber: action.pageNumber,
        totalResults: action.totalResults,
        disabledButton: false,
      };

    case constants.GET_LIST_PRODUCT_REQUEST_FAILED:
      return {
        ...state,
        disabledButton: false,
      };

    default:
      return state;
  }
}

export default ProductsReducer;
