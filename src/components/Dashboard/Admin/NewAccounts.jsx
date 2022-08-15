/** @format */

import {
	Paper,
	Box,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	Typography,
	TableCell,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

const NewAccounts = () => {
	const [newUser, setNewUsers] = useState([]);

	const fetchNewUsers = () => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/user/auth/users-list-five`)
			.then((res) => {
				setNewUsers(res.data);
			});
	};

	useEffect(() => {
		fetchNewUsers();
	}, []);

	return (
		<Fragment>
			<Box p={1}>
				<Typography color='blue'>New Accounts</Typography>
				<TableContainer>
					<Table fullWidth>
						<TableHead color='blue'>
							<TableRow>
								<TableCell>
									<Typography color='blue'>Username</Typography>
								</TableCell>
								<TableCell>
									<Typography color='blue'>Email</Typography>
								</TableCell>
								<TableCell>
									<Typography color='blue'>Phone#</Typography>
								</TableCell>
								<TableCell>
									<Typography color='blue'>City/State</Typography>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>
									<Typography>Username</Typography>
								</TableCell>
								<TableCell>
									<Typography>Email</Typography>
								</TableCell>
								<TableCell>
									<Typography>Phone#</Typography>
								</TableCell>
								<TableCell>
									<Typography>City/State</Typography>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Fragment>
	);
};

export default NewAccounts;
