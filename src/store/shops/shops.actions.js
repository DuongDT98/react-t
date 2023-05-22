import * as constants from "../constants/shops";

export function getListShopsAction(payload) {
  return {
    type: constants.GET_LIST_SHOPS_REQUEST_START,
    payload,
  };
}
