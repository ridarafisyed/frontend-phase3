/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	rolesList: [],
	role_id: 1,
	cat_id: 1,
	isListSuccess: false,
	isListLoading: false,
	isListError: false,
	message: "",
};

export const roleSlice = createSlice({
	name: "rolesList",
	initialState,
	reducers: {
		reset: (state) => initialState,
		setRoleId: (state, action) => {
			state.role_id = action.payload;
		},
		setCatId: (state, action) => {
			state.cat_id = action.payload;
		},
		setRoleList: (state, action) => {
			state.rolesList = action.payload;
		},
		setIsListError: (state, action) => {
			state.isListError = action.payload;
		},
		setIsListLoading: (state, action) => {
			state.isListLoading = action.payload;
		},
		setIsListSuccess: (state, action) => {
			state.isListSuccess = action.payload;
		},
		setMessage: (state, action) => {
			state.message = action.payload;
		},
	},
});

export const {
	reset,
	setRoleId,
	setCatId,
	setRoleList,
	setIsListError,
	setIsListLoading,
	setIsListSuccess,
	setMessage,
} = roleSlice.actions;
export default roleSlice.reducer;
