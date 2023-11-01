import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global/index";
//Auth
import LoginReducer from "./auth/Login";
//Users
import GetAllUserReducer from "./data/Users/GetUsers";

import AddProductsReducer from "./data/Products/AddProducts";
export default configureStore({
  reducer: {
    global: globalReducer,
    //Auth
    Login: LoginReducer,
    //Dashboard
    //Users
    GetUsers: GetAllUserReducer,
    //Products
    AddProducts: AddProductsReducer,
  },
});
