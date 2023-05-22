import { all, put, call, takeLatest } from "redux-saga/effects";
import apiRequestService from "service/api/apiRequest.service";
import { toastError } from "service/api/toast.service";
import * as constants from "../constants/shops";

function getListShops(params) {
  return apiRequestService.getParams("/shops", params);
}

function* getListShopsSaga(actions) {
  try {
    const response = yield call(getListShops, actions?.payload);
    const data = response?.data;
    yield put({
      type: constants.GET_LIST_SHOPS_REQUEST_SUCCEEDED,
      data: data,
      pageSize: response?.pageSize,
      pageNumber: response?.pageNumber,
      totalResults: response?.totalResults,
    });
  } catch (e) {
    yield toastError(e);
    yield put({ type: constants.GET_LIST_SHOPS_REQUEST_FAILED });
  }
}

export function* shopsSaga() {
  yield all([
    takeLatest(constants.GET_LIST_SHOPS_REQUEST_START, getListShopsSaga),
  ]);
}
