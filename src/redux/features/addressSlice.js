/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get user from localStorage

const initialState = {
	city: null,
	state: null,
	county: null,
	zipCode: null,
};

// isFirmReg user

export const addressSlice = createSlice({
	name: "isFirm",
	initialState,
	reducers: {
		resetFirm: (state) => {
			state.city = null;
			state.state = null;
			state.county = null;
			state.zipCode = null;
		},
		resetFirmError: (state) => {
			state.isError = false;
		},
		resetFirmCreateSussess: (state) => {
			state.isRegister = false;
			state.createMessage = "";
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		// sign up reducers
	// 		.addCase(getFirmDetail.pending, (state) => {
	// 			state.isLoading = true;
	// 		})
	// 		.addCase(getFirmDetail.fulfilled, (state, action) => {
	// 			state.isLoading = false;
	// 			state.isSuccess = true;
	// 			state.isFirm = true;
	// 			state.firm = action.payload;
	// 		})
	// 		.addCase(getFirmDetail.rejected, (state, action) => {
	// 			state.isLoading = false;
	// 			state.isError = true;
	// 			state.isFirm = false;
	// 			state.message = action.payload;
	// 			state.firm = null;
	// 		});
	// },
});

export const { resetFirm, resetFirmError, resetFirmCreateSussess } =
	isFirmSlice.actions;
export default isFirmSlice.reducer;
