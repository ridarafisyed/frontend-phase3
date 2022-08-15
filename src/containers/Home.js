/** @format */

import React, { useState, useEffect, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";

import AdminDashboard from "../components/Dashboard/UserRoles/AdminDashboard";
import ClientDashboard from "../components/Dashboard/UserRoles/ClientDashboard";
import LawyerDashboard from "../components/Dashboard/UserRoles/LawyerDashboard";
import FirmDashboard from "../components/Dashboard/UserRoles/FirmDashboard";
import axios from "axios";
import RegisterCompany from "../components/RegisterCompany/RegisterCompany";
import { getFirmDetail } from "../redux/features/isFirmSlice";

const Dashboard = () => {
	const { user } = useSelector((state) => state.auth.user);
	const { firm, setFirm } = useState([]);
	const { isFirm, setIsFirm } = useState(false);
	const dispatch = useDispatch();
	dispatch(getFirmDetail());
	// fetch firm account

	const fetchFirm = () => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/api/firm-detail/?user=${user.id}`)
			.then((response) => {
				setFirm(response.data);
				setIsFirm(true);
			})
			.catch((err) => {
				setIsFirm(false);
			});
	};
	useEffect(() => {
		if (user.is_firm) {
			fetchFirm();
		}
	}, [user]);
	const dashboardRedirect = () => {
		if (user.is_superuser) {
			return <AdminDashboard />;
		} else if (user.is_firm) {
			// if (firm.c_name.length() >= 0) {
			return <FirmDashboard />;
			// } else {
			// 	return <RegisterCompany />;
			// }
		} else if (user.is_firm_employee) {
			return <LawyerDashboard />;
		} else if (user.is_client) {
			return <ClientDashboard />;
		}
	};
	return <>{dashboardRedirect()}</>;
};

export default Dashboard;
