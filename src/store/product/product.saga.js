import { all, put, call, takeLatest } from "redux-saga/effects";
import apiRequestService from "service/api/apiRequest.service";
import { toastError } from "service/api/toast.service";
import * as constants from "../constants/product";

// api
function getListProducts(params) {
  return apiRequestService.getParams("/products", params);
}

function* getListProductSaga(actions) {
  try {
    const response = yield call(getListProducts, actions?.payload);
    const data = response?.data;
    yield put({
      type: constants.GET_LIST_PRODUCT_REQUEST_SUCCEEDED,
      data: data,
      pageSize: response?.pageSize,
      pageNumber: response?.pageNumber,
      totalResults: response?.totalResults,
    });
  } catch (e) {
    yield toastError(e);
    yield put({ type: constants.GET_LIST_PRODUCT_REQUEST_FAILED });
  }
}

export function* productsSaga() {
  yield all([
    takeLatest(constants.GET_LIST_PRODUCT_REQUEST_START, getListProductSaga),
  ]);
}
