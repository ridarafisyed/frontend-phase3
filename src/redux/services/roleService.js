/** @format */

import axios from "axios";

import { CONFIG } from "../../api/MatterApi";

const getRolesList = async () => {
	const response = await axios.get(
		`${process.env.REACT_APP_API_URL}/user/auth/roles/`,
		CONFIG,
	);

	return response.data;
};

// Get user Role
const getRole = async (id) => {
	const response = await axios.get(
		`${process.env.REACT_APP_API_URL}/user/role-single-view/${id}/`,
		CONFIG,
	);
	// console.log(response.data);
	return response.data;
};

const getRoleDetail = async (data) => {
	const response = await axios.get(
		`${process.env.REACT_APP_API_URL}/user/role-cat-filter/?cat_id=${data.cat_id}&role_id=${data.role_id}`,
		CONFIG,
	);
	console.log(response.data);
	return response.data;
};

const roleService = {
	getRolesList,
	getRole,
	getRoleDetail,
};

export default roleService;
