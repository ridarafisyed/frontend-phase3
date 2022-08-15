/** @format */

import axios from "axios";

const token = localStorage.getItem("token");

export const CONFIG_AUTH = {
	headers: {
		"Authorization": `Token ${token}`,
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
};
