/** @format */

import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { CONFIG } from "../../api/MatterApi";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RectangleIcon from "@mui/icons-material/Rectangle";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { getRole } from "../../redux/features/roleSlice";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { setCatId } from "../../redux/features/rolesListSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import "./style.css";
import { TableBody, TableHead, Table } from "@mui/material";

const ToggleButton = styled(MuiToggleButton)({
	"color": "#D3D3D3",
	"backgroundColor": "#D3D3D3",
	"&:hover": {
		color: "#D3D3D3",
		backgroundColor: "#D3D3D3",
	},
	"&.Mui-selected": {
		color: "#4BB543",
		backgroundColor: "#4BB543",
	},
	"&.Mui-selected:hover": {
		color: "#4BB543",
		backgroundColor: "#4BB543",
	},
});

const RoleFunctions = (id) => {
	const role = useSelector((state) => state.role.role);
	const role_id = useSelector((state) => state.rolesList.role_id);
	const cat_id = useSelector((state) => state.rolesList.cat_id);
	const [category, setCategory] = useState(null);
	const isLoading = useSelector((state) => state.role.role);
	const [isAll, setIsAll] = useState(false);
	const [allRoleDetail, setAllRoleDetail] = useState(null);
	const dispatch = useDispatch();

	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
		setCatId(panel);
	};

	const fetchPermission = () => {
		axios
			.get(
				`http://localhost:8000/user/role-cat-filter/?cat_id=${cat_id}&role_id=${role_id}`,
			)
			.then((res) => {
				setAllRoleDetail(res.data);
				// dispatch(getRole(id));
				fetchPermission();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		fetchPermission();
	}, [cat_id, role_id]);

	const updateFunction = (data) => {
		let is_set = false;
		if (data.is_set === false) {
			is_set = true;
		}

		const body = JSON.stringify({ is_set });
		axios
			.patch(
				`${process.env.REACT_APP_API_URL}/user/role-function-permission-single/${data.id}/`,
				body,
				CONFIG,
			)
			.then((res) => {
				dispatch(getRole(id));
				fetchPermission();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const [categories, setCategories] = useState([
		{ id: 1, name: "Administrator Level Controls" },
		{ id: 2, name: "Attorney & Supervisor Level Controls" },
		{ id: 3, name: "Reports" },
		{ id: 4, name: "Confidential Informatio" },
		{ id: 5, name: "Client & Case Controls" },
		{ id: 6, name: "General Controls" },
		{ id: 7, name: "Counsel, Court, Recorder, Bank, & Sherif" },
		{ id: 8, name: "Payment Plan Controls" },
		{ id: 9, name: "Bankruptcy Controls" },
	]);
	const displayList = () => {
		return (
			<Table
				size='small'
				sx={{
					"fontSize": "1rem",
					"&MuiTableCell": {
						border: "solid 2px black",
					},
				}}>
				<TableHead>
					<TableRow bgColor='#796ef0'>
						<TableCell>
							<Typography color='white'></Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Permissions</Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Option</Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Option</Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Option</Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Option</Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Option</Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Option</Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Option</Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Option</Typography>
						</TableCell>
					</TableRow>
					<TableRow bgColor='#796ef0'>
						<TableCell>
							<Typography color='white'></Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'></Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>View </Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Edit</Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Create</Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Delete</Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Contacts</Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Team</Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Office</Typography>
						</TableCell>
						<TableCell>
							<Typography color='white'>Region</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{allRoleDetail?.map((item) => (
						<TableRow>
							<TableCell>
								<Typography color='white'></Typography>
							</TableCell>
							<TableCell sx={{ color: "#796ef0", textTransform: "uppercase" }}>
								{item.name}
							</TableCell>
							{item.function_permission.map((permission) => (
								<>
									<TableCell>
										<ToggleButton
											value={permission.is_set}
											selected={permission.is_set}
											onChange={() => {
												updateFunction(permission);
											}}>
											{permission.is_set ? (
												<RectangleIcon className='activeButton' />
											) : (
												<RectangleIcon className='disableButton' />
											)}
										</ToggleButton>
									</TableCell>
									{item.name === "contact" ? (
										<TableCell>
											<ToggleButton
												value={permission.is_set}
												selected={permission.is_set}
												onChange={() => {
													updateFunction(permission);
												}}
												className='toggleButton'>
												{permission.is_set ? (
													<RectangleIcon className='activeButton' />
												) : (
													<RectangleIcon className='disableButton' />
												)}
											</ToggleButton>
										</TableCell>
									) : null}
								</>
							))}
							{item.name === "contact" ? null : <TableCell colSpan={4} />}
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
	};
	return (
		<>
			{categories.map((category) => (
				<TableRow>
					<TableCell colSpan={9}>
						<Accordion
							expanded={expanded === category.id}
							onChange={handleChange(category.id)}
							sx={{ width: "100%" }}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls='panel1a-content'
								id='panel1a-header'>
								<Button onClick={() => setCatId(category.d)}>
									{category.name}
								</Button>
							</AccordionSummary>
							<AccordionDetails>{displayList(category.id)}</AccordionDetails>
						</Accordion>
					</TableCell>
				</TableRow>
			))}
		</>
	);
};

export default RoleFunctions;
