import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global/index";
//Auth
import LoginReducer from "./auth/Login";
//Dashboard
import GetAllDataReducer from "./dashboard/DashboardData";
//Users
import GetAllUserReducer from "./data/Users/GetUsers";
//Services
import GetServicesReducer from "./Services/GetServices";
import AddServicesReducer from "./Services/AddServices";
import DeleteServicesReducer from "./Services/GetServices";
//Inventory
import GetInventoryReducer from "./Inventory/GetInventory";
import DeleteItemReducer from "./Inventory/DeleteItem";
import EditItemReducer from "./Inventory/EditItem";
import AddItemReducer from "./Inventory/AddItem";
//Bills
import GetBillsReducer from "./Bills/GetBills";
import AddBillsReducer from "./Bills/AddBill";
import EditBillsReducer from "./Bills/EditBill"
import PayBillsReducer from "./Bills/PayBills";
//Reports
import GetReportsReducer from "./Reports/GetReports";
export default configureStore({
  reducer: {
    global: globalReducer,
    //Auth
    Login: LoginReducer,
    //Dashboard
    GetAllData: GetAllDataReducer,
    //Users
    GetUsers: GetAllUserReducer,
    //Services
    GetServices: GetServicesReducer,
    DeleteServices: DeleteServicesReducer,
    AddServices: AddServicesReducer,
    //Inventory
    GetInventory: GetInventoryReducer,
    DeleteItem: DeleteItemReducer,
    EditItem: EditItemReducer,
    AddItem: AddItemReducer,
    //Bills
    GetBills: GetBillsReducer,
    AddBills: AddBillsReducer,
    EditBills: EditBillsReducer,
    PayBills: PayBillsReducer,
    //Reports
    GetReports: GetReportsReducer,
  },
});
