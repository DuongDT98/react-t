import * as constants from "../constants/customer";

let INIT_STATE = {
  listCustomer: [],
  pageSize: 10,
  pageNumber: 1,
  totalResults: 0,
  disabledButton: false,
};

function CustomerReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case constants.GET_LIST_CUSTOMER_REQUEST_START:
      return { ...state, disabledButton: true };

    case constants.GET_LIST_CUSTOMER_REQUEST_SUCCEEDED:
      return {
        ...state,
        listCustomer: action.data,
        pageSize: action.pageSize,
        pageNumber: action.pageNumber,
        totalResults: action.totalResults,
        disabledButton: false,
      };

    case constants.GET_LIST_CUSTOMER_REQUEST_FAILED:
      return {
        ...state,
        disabledButton: false,
      };

    case constants.SEARCH_CUSTOMER_REQUEST_START:
      return { ...state, disabledButton: true };

    case constants.SEARCH_CUSTOMER_REQUEST_SUCCEEDED:
      return {
        ...state,
        listCustomer: action.data,
        pageSize: action.pageSize,
        pageNumber: action.pageNumber,
        totalResults: action.totalResults,
        disabledButton: false,
      };

    case constants.SEARCH_CUSTOMER_REQUEST_FAILED:
      return {
        ...state,
        disabledButton: false,
      };

    default:
      return state;
  }
}

export default CustomerReducer;
