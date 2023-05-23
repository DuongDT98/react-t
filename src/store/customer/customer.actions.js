import * as constants from "../constants/customer";

export function getListCustomerAction(payload) {
  return {
    type: constants.GET_LIST_CUSTOMER_REQUEST_START,
    payload,
  };
}

export function handleSearchCustomer(payload) {
  return {
    type: constants.GET_LIST_CUSTOMER_REQUEST_START,
    payload,
  };
}
