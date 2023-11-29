import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Geography from "scenes/geography";
import { LanguageContext } from "language";
import Cookies from "universal-cookie";
import Login from "scenes/auth/Login";
import Admins from "scenes/data/Admins";
import AddAdmin from "scenes/data/Admins/AddAdmin";
import Users from "scenes/data/Admins";
import Countries from "scenes/system/countries/countries";
import Info from "scenes/system/info/info";
import Orders from "scenes/system/orders/orders";
import Products from "scenes/data/Products";
import AddProduct from "scenes/data/Products/AddProduct";
import AddCC from "scenes/system/countries/AddCC";
import Archive from "scenes/system/archive";
import Requests from "scenes/data/Requests";
import Ad from "scenes/system/ad/Ad";
import Complaints from "scenes/system/complaints/complaints";
import Reports from "scenes/data/Reports";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const context = useContext(LanguageContext);
  const cookies = new Cookies();
  return (
    <div className="app" dir={context.language === "en" ? "ltr" : "rtl"}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {cookies.get("_auth_token") ? (
            cookies.get("_auth_role") === "Owner" ? (
              <Routes>
                <Route element={<Layout />}>
                  <Route
                    path="/*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/addadmin" element={<AddAdmin />} />
                  <Route path="/countries" element={<Countries />} />
                  <Route path="/employees" element={<Admins />} />
                  <Route path="/geography" element={<Geography />} />
                  <Route path="/complaints" element={<Complaints />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/info" element={<Info />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/addproduct" element={<AddProduct />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/addcc" element={<AddCC />} />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/requests" element={<Requests />} />
                  <Route path="/ad" element={<Ad />} />
                </Route>
              </Routes>
            ) : (
              <Routes>
                <Route element={<Layout />}>
                  <Route
                    path="/*"
                    element={<Navigate to="/clients" replace />}
                  />
                </Route>
              </Routes>
            )
          ) : (
            <Routes>
              <Route path="/*" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          )}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
