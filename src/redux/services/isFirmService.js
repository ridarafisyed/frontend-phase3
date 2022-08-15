/** @format */
import axios from "axios";
import { CONFIG } from "../../api/MatterApi";

const API_URL = `${process.env.REACT_APP_API_URL}/api/firm-detail/`;

const getFirmDetail = async (id) => {
	const response = await axios.get(
		`${process.env.REACT_APP_API_URL}/api/firm-detail/`,
		CONFIG,
	);

	return response.data;
};

const isFirmService = {
	getFirmDetail,
};

export default isFirmService;
