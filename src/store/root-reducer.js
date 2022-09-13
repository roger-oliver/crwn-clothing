import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart.reduce";
import { categoryReducer } from "./categories/category.reducer";
import { userReducer } from "./user/user.reducer";


export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoryReducer,
  cart: cartReducer,
});
