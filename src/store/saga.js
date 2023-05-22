import { all, fork } from "redux-saga/effects";
import { customerSaga } from "./customer/customer.saga";
import { productsSaga } from "./product/product.saga";
import { shopsSaga } from "./shops/shops.saga";

export default function* rootSaga() {
  yield all([fork(shopsSaga)]);
  yield all([fork(customerSaga)]);
  yield all([fork(productsSaga)]);
}
