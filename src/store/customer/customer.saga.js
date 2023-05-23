import { all, put, call, takeLatest } from "redux-saga/effects";
import apiRequestService from "service/api/apiRequest.service";
import { toastError } from "service/api/toast.service";
import * as constants from "../constants/customer";

// api
function getListCustomer(params) {
  return apiRequestService.getParams("/customer", params);
}

function* getListCustomerSaga(actions) {
  try {
    const response = yield call(getListCustomer, actions?.payload);
    const data = response?.data;
    yield put({
      type: constants.GET_LIST_CUSTOMER_REQUEST_SUCCEEDED,
      data: data,
      pageSize: response?.pageSize,
      pageNumber: response?.pageNumber,
      totalResults: response?.totalResults,
    });
  } catch (e) {
    yield toastError(e);
    yield put({ type: constants.GET_LIST_CUSTOMER_REQUEST_FAILED });
  }
}

function searchCustomerRequest(params) {
  return apiRequestService.getParams("/customer/search", params);
}

function* searchCustomerSaga(actions) {
  try {
    const response = yield call(searchCustomerRequest, actions?.payload);
    const data = response?.data;
    yield put({
      type: constants.SEARCH_CUSTOMER_REQUEST_SUCCEEDED,
      data: data,
      pageSize: response?.pageSize,
      pageNumber: response?.pageNumber,
      totalResults: response?.totalResults,
    });
  } catch (e) {
    yield toastError(e);
    yield put({ type: constants.SEARCH_CUSTOMER_REQUEST_FAILED });
  }
}

export function* customerSaga() {
  yield all([
    takeLatest(constants.GET_LIST_CUSTOMER_REQUEST_START, getListCustomerSaga),
    takeLatest(constants.SEARCH_CUSTOMER_REQUEST_START, searchCustomerSaga),
  ]);
}
