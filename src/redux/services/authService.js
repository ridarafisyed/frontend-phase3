/** @format */

import axios from "axios";
import { CONFIG } from "../../api/MatterApi";

const API_URL = `${process.env.REACT_APP_API_URL}/user/auth/`;

// Register user
const signUp = async (userData) => {
	const response = await axios.post(API_URL + "register", userData, CONFIG);

	// if (response.data) {
	// 	localStorage.setItem("user", JSON.stringify(response.data.user));
	// 	localStorage.setItem("token", JSON.stringify(response.data.token));
	// }

	return response.data;
};

// Login user
const signIn = async (userData) => {
	const response = await axios.post(API_URL + "login", userData, CONFIG);

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
		localStorage.setItem("token", JSON.stringify(response.data.token));
	}

	return response.data;
};

// Logout user
const signOut = async () => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const token = JSON.parse(localStorage.getItem("token"));
	// If token, add to headers config
	if (token) {
		config.headers["Authorization"] = `Token ${token}`;
	}
	axios
		.post(`${process.env.REACT_APP_API_URL}/user/auth/logout`, null, config)
		.then((res) => {
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			return res.data;
		});
};

const authService = {
	signIn,
	signOut,
	signUp,
};

export default authService;
