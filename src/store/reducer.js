import { combineReducers } from "redux";
import CustomerReducer from "./customer/customer.reducers";
import ProductsReducer from "./product/product.reducers";
import ShopsReducer from "./shops/shops.reducers";

const rootReducer = combineReducers({
  shops: ShopsReducer,
  customer: CustomerReducer,
  products: ProductsReducer,
});

export default rootReducer;
