import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import reducers from "../reducers";

const preloadedState = {
  cart: [],
  wishList: []
};

const composedEnhancers = composeWithDevTools(applyMiddleware(logger, thunkMiddleware));
const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer, preloadedState, composedEnhancers)

export default store;
