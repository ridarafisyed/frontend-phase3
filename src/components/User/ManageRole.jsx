/** @format */

import React, { Fragment, useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import RoleFunctions from "./RoleFunctions";
import ClearIcon from "@mui/icons-material/Clear";
import CircularProgress from "@mui/material/CircularProgress";
import { ActionAlerts } from "../../utils/ActionAlerts";

import { CONFIG } from "../../api/MatterApi";
import { useSelector, useDispatch } from "react-redux";
import { getRole } from "../../redux/features/roleSlice";
import {
	setIsListLoading,
	setCatId,
	setIsListSuccess,
	setMessage,
	setRoleId,
	setRoleList,
} from "../../redux/features/rolesListSlice";
import { ListItemText } from "@mui/material";

const CATEGORIES = [
	{ id: 1, name: "Administrator Level Controls" },
	{ id: 2, name: "Attorney & Supervisor Level Controls" },
	{ id: 3, name: "Reports" },
	{ id: 4, name: "Confidential Informatio" },
	{ id: 5, name: "Client & Case Controls" },
	{ id: 6, name: "General Controls" },
	{ id: 7, name: "Counsel, Court, Recorder, Bank, & Sherif" },
	{ id: 8, name: "Payment Plan Controls" },
	{ id: 9, name: "Bankruptcy Controls" },
];

const ManageRole = () => {
	const role = useSelector((state) => state.role.role);
	const role_id = useSelector((state) => state.rolesList.role_id);
	const cat_id = useSelector((state) => state.rolesList.cat_id);
	const { isListSuccess, isListLoading, isListError, message } = useSelector(
		(state) => state.rolesList,
	);
	const { isLoading, isSuccess } = useSelector((state) => state.rolesList);

	const rolesList = useSelector((state) => state.rolesList.rolesList);
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		name: "",
	});
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
		setCatId(panel);
	};

	const fetchRolesList = () => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/user/auth/roles/`)
			.then((res) => {
				dispatch(setRoleList(res.data));
				dispatch(setIsListLoading(false));
				dispatch(setIsListSuccess(true));
			})
			.catch((err) => {
				dispatch(setIsListLoading(false));
				dispatch(setIsListSuccess(true));
				dispatch(setMessage(err.message));
			});
	};

	const { name } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		fetchRolesList();
		// dispatch(getRolesList());
		dispatch(getRole(1));
	}, []);
	const handleDelete = (id) => {
		axios
			.delete(
				`${process.env.REACT_APP_API_URL}/user/role-delete-view/${id}/`,
				CONFIG,
			)
			.then((res) => {
				fetchRolesList();
				return (
					<ActionAlerts
						value={{ status: res.statusText, message: "Success" }}
					/>
				);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const body = JSON.stringify({ name });
		axios
			.post(`${process.env.REACT_APP_API_URL}/user/role-create/`, body, CONFIG)
			.then((res) => {
				fetchRolesList();
				return (
					<ActionAlerts
						value={{ status: res.statusText, message: "Success" }}
					/>
				);
			})
			.catch((err) => {
				fetchRolesList();
				return (
					<ActionAlerts
						value={{ status: err.statusText, message: "Success" }}
					/>
				);
			});
	};
	const handleRoleSelect = (id) => {
		dispatch(getRole(id));
		dispatch(setRoleId(id));
	};
	return (
		<Fragment>
			<Grid container spacing={2}>
				<Grid item lg={12}></Grid>
				<Grid item lg={2} component={Paper} elevation={5}>
					<Box p={2}>
						<Button
							variant='contained'
							onClick={handleClickOpen}
							fullWidth
							sx={{
								borderRadius: "0.5rem",
							}}>
							+ New Role
						</Button>
						<Dialog
							component='form'
							Validate
							onSubmit={(e) => handleSubmit(e)}
							open={open}
							onClose={handleClose}
							aria-labelledby='alert-dialog-title'
							aria-describedby='alert-dialog-description'>
							<DialogTitle id='alert-dialog-title'>
								{"Add New Role"}
							</DialogTitle>
							<DialogContent>
								<TextField
									required
									fullWidth
									size='small'
									margin='normal'
									variant='outlined'
									name='name'
									label='Role Name'
									type='text'
									value={name}
									onChange={(e) => onChange(e)}
									id='name'
									autoComplete='name'
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose}>Close</Button>
								<Button type='submit' autoFocus>
									Add
								</Button>
							</DialogActions>
						</Dialog>
						<Box>
							<List>
								{!isListLoading ? (
									rolesList?.map((data, index) => (
										<ListItem
											disablePadding
											key={index}
											secondaryAction={
												<IconButton
													edge='end'
													variant='contained'
													value={data.id}
													size='small'
													onClick={() => handleDelete(data.id)}
													sx={{
														borderRadius: "0.5rem",
													}}>
													<ClearIcon />
												</IconButton>
											}>
											<ListItemText>
												<Button
													sx={
														data.id === role.id
															? {
																	"backgroundColor": "#796ef0",
																	"color": "white",
																	"whiteSpace": "wrap",
																	"&:hover": {
																		color: "#796ef0",
																		backgroundColor: "white",
																	},
															  }
															: null
													}
													onClick={() => handleRoleSelect(data.id)}>
													{data.name}
												</Button>
											</ListItemText>
										</ListItem>
									))
								) : (
									<Box mt={5} sx={{ display: "flex" }}>
										<CircularProgress />
									</Box>
								)}
							</List>
						</Box>
					</Box>
				</Grid>
				<Grid item lg={10}>
					<TableContainer sx={{ overflowX: "auto" }}>
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
									<TableCell colSpan={9}>
										<Typography color='white'>Categories</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{/* {!isLoading ? (
									isSuccess ? (
										role ? ( */}
								<RoleFunctions />
								{/* {CATEGORIES.map((category) => (
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
													{category.name}
												</AccordionSummary>
												<AccordionDetails>here is the detail</AccordionDetails>
											</Accordion>
										</TableCell>
									</TableRow> */}
								{/* ))} */}
								{/* ) : (
											<>please selete a role</>
										)
									) : (
										<Box mt={5} sx={{ display: "flex" }}>
											<CircularProgress />
										</Box>
									)
								) : (
									<Box mt={5} sx={{ display: "flex" }}>
										<CircularProgress />
									</Box>
								)} */}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Fragment>
	);
};

export default ManageRole;
