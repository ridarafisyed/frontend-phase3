/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import authService from "../services/authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
	user: user ? user : null,
	isAuthenticated: false,
	isError: false,
	token: token ? token : null,
	isSuccess: false,
	isLoading: false,
	isCreated: false,
	createMessage: "",
	message: "",
};

// signUp user
export const signUp = createAsyncThunk(
	"auth/signUp",
	async (user, thunkAPI) => {
		try {
			return await authService.signUp(user);
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

// signIn user
export const signIn = createAsyncThunk(
	"auth/signIn",
	async (user, thunkAPI) => {
		try {
			return await authService.signIn(user);
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

export const signOut = createAsyncThunk("auth/signOut", async (thunkAPI) => {
	try {
		return await authService.signOut();
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.isAuthenticated = false;
			state.isCreated = false;
			state.createMessage = "";
			state.message = "";
		},
		resetError: (state) => {
			state.isError = false;
		},
		resetCreateSussess: (state) => {
			state.isCreated = false;
			state.createMessage = "";
		},
	},
	extraReducers: (builder) => {
		builder
			// sign up reducers
			.addCase(signUp.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isCreated = true;
				state.createMessage =
					"Your Account is Successfully Created! Please login";
			})
			.addCase(signUp.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isAuthenticated = false;
				state.message = action.payload;
				state.user = null;
			})
			// sign in Reducers
			.addCase(signIn.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isAuthenticated = true;
				state.user = action.payload;
				state.userToken = action.payload.userToken;
			})
			.addCase(signIn.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				console.log(action.payload);
				state.message = action.payload;
				state.user = null;
			})
			// sign out reducers
			.addCase(signOut.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signOut.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(signOut.fulfilled, (state) => {
				state.user = null;
				state.isSuccess = true;
				state.isAuthenticated = false;
			});
	},
});

export const { reset, resetError, resetCreateSussess } = authSlice.actions;
export default authSlice.reducer;
