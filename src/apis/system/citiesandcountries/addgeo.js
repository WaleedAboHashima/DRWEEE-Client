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

const api = `${baseURL}/api/owner/country-cities`;

export const AddGeoInfo = createAsyncThunk(
  "AddGeoInfo/GeoSlice",
  async (arg) => {
    try {
      const res = await axios.post(
        api,
        {
          country: arg.country,
          city: arg.city,
          government: arg.government,
        },
        { headers: { Authorization: `Bearer ${Cookie.get("_auth_token")}` } }
      );
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

const GeoSlice = createSlice({
  name: "CountiresSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddGeoInfo.fulfilled, (state, action) => {
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
    builder.addCase(AddGeoInfo.pending, (state) => {
      state.loading = true;
      state.data = {};
      state.state = "Pending";
      state.status = "";
      state.error = "";
    });
    builder.addCase(AddGeoInfo.rejected, (state) => {
      state.loading = false;
      state.data = {};
      state.state = "Rejected";
      state.status = 500;
      state.error = "Server Error";
    });
  },
});

export default GeoSlice.reducer;