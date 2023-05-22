import * as constants from "../constants/shops";

let INIT_STATE = {
  listShops: [],
  pageSize: 10,
  pageNumber: 1,
  totalResults: 0,
  disabledButton: false,
};

function ShopsReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case constants.GET_LIST_SHOPS_REQUEST_START:
      return { ...state, disabledButton: true };

    case constants.GET_LIST_SHOPS_REQUEST_SUCCEEDED:
      return {
        ...state,
        listShops: action.data,
        pageSize: action.pageSize,
        pageNumber: action.pageNumber,
        totalResults: action.totalResults,
        disabledButton: false,
      };

    case constants.GET_LIST_SHOPS_REQUEST_FAILED:
      return {
        ...state,
        disabledButton: false,
      };

    default:
      return state;
  }
}

export default ShopsReducer;
