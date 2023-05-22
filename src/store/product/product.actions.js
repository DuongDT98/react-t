import * as constants from "../constants/product";

export function getListProductAction(payload) {
  return {
    type: constants.GET_LIST_PRODUCT_REQUEST_START,
    payload,
  };
}
