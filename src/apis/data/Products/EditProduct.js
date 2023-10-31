import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "constant/index";
import axios from "axios";
import Cookies from "universal-cookie";

const initialState = {
  date: {},
  loading: false,
  error: "",
  status: null,
  state: "",
};

const cookies = new Cookies();
const api = `${baseURL}/api/main/edit/product/`;

export const EditProductHandler = createAsyncThunk(
  "ProductsData/EditProductHandler",
  async (arg) => {
    try {
      const response = await axios.put(api + arg.id, arg.formdata, {
        headers: { Authorization: `Bearer ${cookies.get("_auth_token")}` },
      });
      return {
        data: response.data,
        status: response.status,
        success: response.success
      };
    } catch (err) {
      return {
        success: err.response.data.success,
        message: err.response.data.message,
        status: err.response.status,
      };
    }
  }
);

const ProductsSlice = createSlice({
  name: "ProductsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(EditProductHandler.fulfilled, (state, action) => {
      state.loading = true;
      if (action.payload.status === 201) {
        state.data = action.payload.data;
        state.loading = false;
        state.state = "Success";
        state.status = action.payload.status;
        state.error = "";
      } else {
        state.loading = false;
        state.data = {};
        state.state = "Error";
        state.status = action.payload.status;
        state.error = action.payload.message;
      }
    });
    builder.addCase(EditProductHandler.rejected, (state) => {
      state.loading = false;
      state.date = {};
      state.state = "Rejected";
      state.status = 500;
      state.error = "Server Error";
    });
    builder.addCase(EditProductHandler.pending, (state) => {
      state.loading = true;
      state.data = {};
      state.state = "Pending";
      state.status = null;
      state.error = "";
    });
  },
});

export default ProductsSlice.reducer;