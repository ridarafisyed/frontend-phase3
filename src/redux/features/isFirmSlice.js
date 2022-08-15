/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import isFirmService from "../services/isFirmService";

// Get user from localStorage

const initialState = {
	firm: [],
	isFirm: false,
	isError: false,
	isSuccess: false,
	isLoading: false,
	isRegister: false,
	createMessage: "",
	message: "",
};

// isFirmReg user
export const getFirmDetail = createAsyncThunk(
	"/firm-detail",
	async (thunkAPI) => {
		try {
			return await isFirmService.getFirmDetail();
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	},
);

export const isFirmSlice = createSlice({
	name: "isFirm",
	initialState,
	reducers: {
		resetFirm: (state) => {
			state.isFirm = false;
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.isRegister = false;
			state.createMessage = "";
			state.message = "";
		},
		resetFirmError: (state) => {
			state.isError = false;
		},
		resetFirmCreateSussess: (state) => {
			state.isRegister = false;
			state.createMessage = "";
		},
	},
	extraReducers: (builder) => {
		builder
			// sign up reducers
			.addCase(getFirmDetail.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getFirmDetail.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isFirm = true;
				state.firm = action.payload;
			})
			.addCase(getFirmDetail.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isFirm = false;
				state.message = action.payload;
				state.firm = null;
			});
	},
});

export const { resetFirm, resetFirmError, resetFirmCreateSussess } =
	isFirmSlice.actions;
export default isFirmSlice.reducer;
