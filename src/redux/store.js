import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const intitialState = {};
const store = createStore(
  rootReducer,
  intitialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
