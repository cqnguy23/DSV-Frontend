import { combineReducers } from "redux";
import productsReducer from "./products.reducer";
import userReducer from "./user.reducer";
export default combineReducers({
  products: productsReducer,
  user: userReducer,
});
