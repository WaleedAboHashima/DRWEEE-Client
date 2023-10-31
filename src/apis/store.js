import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global/index";
//Auth
import LoginReducer from "./auth/Login";
//Users
import GetAllUserReducer from "./data/Users/GetUsers";
//Services
import GetServicesReducer from "./Services/GetServices";
import AddServicesReducer from "./Services/AddServices";
import DeleteServicesReducer from "./Services/GetServices";

import AddProductsReducer from "./data/Products/AddProducts";
export default configureStore({
  reducer: {
    global: globalReducer,
    //Auth
    Login: LoginReducer,
    //Dashboard
    //Users
    GetUsers: GetAllUserReducer,
    //Services
    GetServices: GetServicesReducer,
    DeleteServices: DeleteServicesReducer,
    AddServices: AddServicesReducer,
    //Products
    AddProducts: AddProductsReducer,
  },
});
