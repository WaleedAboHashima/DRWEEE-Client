import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookie, baseURL } from "constant";

const initialState = {
  data: {},
  error: "",
  state: "",
  status: "",
  loading: false,
};

const api = `${baseURL}/api/owner/ad`;

export const AddAdvHandler = createAsyncThunk(
  "AddAdvHandler/AdSlice",
  async (arg) => {
    try {
      const res = await axios.post(api, arg, {
        headers: { Authorization: `Bearer ${Cookie.get("_auth_token")}` },
      });
      return {
        data: res.data,
        status: res.status,
      };
    } catch (err) {
      return {
        message: err.response.data.message,
        status: err.response.status,
      };
    }
  }
);

const AdSlice = createSlice({
  name: "AdSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddAdvHandler.fulfilled, (state, action) => {
      state.loading = true;
      if (action.payload.status === 200) {
        state.loading = false;
        state.data = action.payload.data;
        state.state = "Success";
        state.status = action.payload.status;
        state.error = "";
      } else {
        state.loading = false;
        state.data = {};
        state.error = action.payload.message;
        state.status = action.payload.status;
        state.error = "";
        state.state = "Error";
      }
    });
    builder.addCase(AddAdvHandler.pending, (state) => {
      state.loading = true;
      state.data = {};
      state.state = "Pending";
      state.status = "";
      state.error = "";
    });
    builder.addCase(AddAdvHandler.rejected, (state) => {
      state.loading = false;
      state.data = {};
      state.state = "Rejected";
      state.status = 500;
      state.error = "Server Error";
    });
  },
});

export default AdSlice.reducer;
