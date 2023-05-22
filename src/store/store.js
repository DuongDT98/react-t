import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";

import rootReducer from "./reducer";
import rootSaga from "./saga";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
