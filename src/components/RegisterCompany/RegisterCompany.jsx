/** @format */

import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import { useToggle } from "../../context/useToggle";
import Container from "@mui/material/Container";
import { CONFIG } from "../../api/MatterApi";
import { Redirect } from "react-router-dom";

const RegisterCompany = () => {
	const { user } = useSelector((state) => state.auth.user);
	const [users, setUsers] = useState(0);
	const [cases, setCases] = useState(0);
	const [users2, setUsers2] = useState(0);
	const [cases2, setCases2] = useState(0);
	const [isAddressSame, setIsAddressSame] = useToggle(false);
	const [billingDate, setBillingDate] = React.useState(new Date());
	const [logo, setLogo] = useState(null);
	const [isMonthly, setIsMonthly] = useToggle(true);
	const [plan, setPlan] = useToggle(false);

	const handleChange = (event) => {
		setBillingDate(event.target.value);
	};

	const [userData, setUserData] = useState({
		// personal Data relate to member
		first_name: user.profile.first_name,
		middle_name: "",
		last_name: user.profile.last_name,
		p_email: "",
		mobile: "",
		home: "",
		street: "",
		suite: "",
		city: "",
		state: "",
		zip: "",
		ext: "",

		// Comapany data
		c_name: "",
		dba_name: "",
		tax_id: "",
		tax_id_ext: "",
		website: "",
		office: "",
		c_street: "",
		c_suite: "",
		c_city: "",
		c_state: "",
		c_zip: "",
		c_ext: "",

		// payment info
		account: "",
		bank_name: "",
		routing_no: "",
		account_no: "",
		creditcard: "",
		card_no: "",
		security_id: "",
		exp_data: "",
		// billing info

		billing_street: "",
		billing_suite: "",
		billing_city: "",
		billing_state: "",
		billing_zip: "",
		billing_ext: "",
	});
	const {
		// personal Data relate to member
		first_name,
		middle_name,
		last_name,
		street,
		suite,
		city,
		state,
		zip,
		ext,
		mobile,
		home,
		p_email,

		// Comapany data
		c_name,
		dba_name,
		tax_id,
		tax_id_ext,
		website,
		office,
		c_street,
		c_suite,
		c_city,
		c_state,
		c_zip,
		c_ext,

		// payment info
		account,
		bank_name,
		routing_no,
		account_no,
		creditcard,
		card_no,
		security_id,
		exp_data,
		// billing info
		billing_street,
		billing_suite,
		billing_city,
		billing_state,
		billing_zip,
		billing_ext,
	} = userData;
	const onChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e) => {
		setLogo({
			logo: e.target.files[0],
		});
	};
	// const calculatePlan01 = () => {
	// 	if (users <= 25) {
	// 		return users *
	// 	}
	// 	else if (users >25 && users <=50){
	//

	// 	}
	// 	else if (users > 50 && users <=75){

	// 	}
	// 	else if (users >75 && users <=100){

	// 	}
	// };
	// const calculatePlan02 = () => {};

	const handleSubmit = (e) => {
		e.preventDefault();

		const URL_PROFILE = `${process.env.REACT_APP_API_URL}/api/update-profile/${user.profile.id}/`;
		const URL_COMPANY = `${process.env.REACT_APP_API_URL}/api/create-firm/${user.firm.id}/`;
		const URL_PAYMENT = `${process.env.REACT_APP_API_URL}/api/payment-info-reg/${user.paymentInfo.id}/`;
		const URL_BILL_ADD = `${process.env.REACT_APP_API_URL}/api/bill-add-reg/${user.billingAddress.id}/`;
		const personal_data = JSON.stringify({
			first_name,
			middle_name,
			last_name,
			p_email,
			home,
			mobile,
			street,
			suite,
			city,
			state,
			zip,
			ext,
		});
		const company_data = JSON.stringify({
			logo,
			c_name,
			dba_name,
			tax_id,
			tax_id_ext,
			website,
			office,
			c_street,
			c_suite,
			c_city,
			c_state,
			c_zip,
			c_ext,
		});
		const payment_data = JSON.stringify({
			account,
			bank_name,
			routing_no,
			account_no,
			creditcard,
			card_no,
			security_id,
			exp_data,
		});
		let obj = {};
		if (isAddressSame) {
			obj = {
				is_monthly: isMonthly,
				plan: plan,
				street: c_street,
				suite: c_suite,
				city: c_city,
				state: c_state,
				zip: c_zip,
				ext: c_ext,
			};
		} else {
			obj = {
				is_monthly: isMonthly,
				plan: plan,
				street: billing_street,
				suite: billing_suite,
				city: billing_city,
				state: billing_state,
				zip: billing_zip,
				ext: billing_ext,
			};
		}
		const billing_data = JSON.stringify(obj);

		// buisness Ower personal information goes into personal profile
		axios
			.put(URL_PROFILE, personal_data, CONFIG)
			.then((res) => console.log(""))
			.catch((err) => console.log(""));

		// company information goes into company profile table

		axios
			.put(URL_COMPANY, company_data, CONFIG)
			.then((res) => console.log(""))
			.catch((err) => console.log(""));

		// Payment inforamtion goes company id with billing info Credit card detail etc

		axios
			.put(URL_PAYMENT, payment_data, CONFIG)
			.then((res) => console.log(""))
			.catch((err) => console.log(""));

		// payment or billing method goes seperate billing method table plan detail along with id

		axios
			.put(URL_BILL_ADD, billing_data, CONFIG)
			.then((res) => console.log(""))
			.catch((err) => console.log(""));

		return <Redirect to='/' />;
		// term and condition shoes and by signin in means he is agreeing on it
	};

	return (
		<Fragment>
			<Box component='form' Validate mb={6} onSubmit={(e) => handleSubmit(e)}>
				<Container>
					<Grid
						container
						spacing={2}
						mt={2}
						mb={3}
						sx={{
							"& .MuiTextField-root": { m: 1, maxWidth: "17rem" },
						}}>
						<Grid item xs={12}>
							<Typography component='h3' variant='h5'>
								Business Owner Personal Information
							</Typography>

							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='first_name'
								value={first_name}
								label='First Name'
								type='text'
								onChange={(e) => onChange(e)}
								id='first_name'
								autoComplete='first_name'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								value={middle_name}
								variant='outlined'
								name='middle_name'
								label='Middle Name'
								type='text'
								onChange={(e) => onChange(e)}
								id='middle_name'
								autoComplete='middle_name'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='last_name'
								label='Last Name'
								value={last_name}
								type='text'
								onChange={(e) => onChange(e)}
								id='last_name'
								autoComplete='last_name'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='p_email'
								label='Personal Email Address'
								type='email'
								onChange={(e) => onChange(e)}
								id='p_email'
								autoComplete='p_email'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='home'
								label='Home #'
								type='phone'
								onChange={(e) => onChange(e)}
								id='home'
								autoComplete='home'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='mobile'
								label='Mobile #'
								type='phone'
								onChange={(e) => onChange(e)}
								id='mobile'
								autoComplete='mobile'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='street'
								label='Street'
								type='text'
								onChange={(e) => onChange(e)}
								id='street'
								autoComplete='street'
								sx={{ width: "6rem" }}
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='suite'
								label='Suite'
								type='text'
								onChange={(e) => onChange(e)}
								id='suite'
								autoComplete='suite'
								sx={{ width: "6rem" }}
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='city'
								label='City'
								type='text'
								onChange={(e) => onChange(e)}
								id='city'
								autoComplete='city'
								sx={{ width: "5rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='state'
								label='State'
								type='text'
								onChange={(e) => onChange(e)}
								id='state'
								autoComplete='state'
								sx={{ width: "5rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='zip'
								label='Zip'
								type='number'
								onChange={(e) => onChange(e)}
								id='zip'
								autoComplete='zip'
								sx={{ width: "4rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='ext'
								label='+4'
								type='number'
								onChange={(e) => onChange(e)}
								id='ext'
								autoComplete='ext'
								sx={{ width: "4rem" }}
							/>

							<Divider />
						</Grid>

						<Grid item xs={12}>
							<Typography component='h3' variant='h5'>
								Company Information
							</Typography>
							<TextField
								fullWidth
								size='small'
								margin='normal'
								variant='outlined'
								name='c_name'
								label='Company Name'
								type='text'
								onChange={(e) => onChange(e)}
								id='c_name'
								autoComplete='c_name'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='dba_name'
								label='DBA Name'
								type='text'
								onChange={(e) => onChange(e)}
								id='dba_name'
								autoComplete='dba_name'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='tax_id'
								label='Tax ID #'
								type='text'
								onChange={(e) => onChange(e)}
								id='tax_id'
								autoComplete='tax_id'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='tax_id_ext'
								label='Ext'
								type='text'
								onChange={(e) => onChange(e)}
								id='tax_id_ext'
								autoComplete='tax_id_ext'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								size='small'
								margin='normal'
								fullWidth
								variant='outlined'
								name='website'
								label='Website'
								type='text'
								onChange={(e) => onChange(e)}
								id='website'
								autoComplete='website'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='office'
								label='Office'
								type='text'
								onChange={(e) => onChange(e)}
								id='office'
								autoComplete='office'
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_street'
								label='Street'
								type='text'
								onChange={(e) => onChange(e)}
								id='c_street'
								autoComplete='c_street'
								sx={{ width: "6rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_suite'
								label='Suite'
								type='text'
								onChange={(e) => onChange(e)}
								id='c_suite'
								autoComplete='c_suite'
								sx={{ width: "6rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_city'
								label='City'
								type='text'
								onChange={(e) => onChange(e)}
								id='c_city'
								autoComplete='c_city'
								sx={{ width: "5rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_state'
								label='State'
								type='text'
								onChange={(e) => onChange(e)}
								id='c_state'
								autoComplete='c_state'
								sx={{ width: "5rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_zip'
								label='Zip'
								type='number'
								onChange={(e) => onChange(e)}
								id='c_zip'
								autoComplete='c_zip'
								sx={{ width: "4rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_ext'
								label='+4'
								type='number'
								onChange={(e) => onChange(e)}
								id='c_ext'
								autoComplete='c_ext'
								sx={{ width: "4rem" }}
							/>
							<br />
							<input
								type='file'
								id='image'
								accept='image/png, image/jpeg'
								onChange={handleImageChange}
							/>
							<Divider />
						</Grid>

						<Grid item xs={12}>
							<Typography component='h3' variant='h5'>
								Payment Information
							</Typography>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='account'
								label='Name on Account'
								type='text'
								onChange={(e) => onChange(e)}
								id='account'
								autoComplete='account'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='bank_name'
								label='Bank Name'
								type='text'
								onChange={(e) => onChange(e)}
								id='bank_name'
								autoComplete='bank_name'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='routing_no'
								label='Routing #'
								type='text'
								onChange={(e) => onChange(e)}
								id='routing_no'
								autoComplete='routing_no'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='account_no'
								label='Account No'
								type='text'
								onChange={(e) => onChange(e)}
								id='account_no'
								autoComplete='account_no'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='creditcard'
								label='Credit Card'
								type='text'
								onChange={(e) => onChange(e)}
								id='creditcard'
								autoComplete='creditcard'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='card_no'
								label='Card #'
								type='text'
								onChange={(e) => onChange(e)}
								id='card_no'
								autoComplete='card_no'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='security_id'
								label='Security ID'
								type='text'
								onChange={(e) => onChange(e)}
								id='security_id'
								autoComplete='security_id'
							/>
							<TextField
								size='small'
								fullWidth
								margin='normal'
								variant='outlined'
								name='exp_data'
								label='Expiration Date'
								type='text'
								onChange={(e) => onChange(e)}
								id='exp_data'
								autoComplete='exp_data'
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Switch
										checked={isAddressSame}
										onChange={() => setIsAddressSame()}
									/>
								}
								label='Same As Company Address'
							/>

							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_street'
								label='Street'
								type='text'
								onChange={(e) => onChange(e)}
								id='c_street'
								autoComplete='c_street'
								disabled={isAddressSame}
								sx={{ width: "6rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_suite'
								label='Suite'
								type='text'
								onChange={(e) => onChange(e)}
								id='c_suite'
								autoComplete='c_suite'
								disabled={isAddressSame}
								sx={{ width: "6rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_city'
								label='City'
								type='text'
								onChange={(e) => onChange(e)}
								id='c_city'
								autoComplete='c_city'
								disabled={isAddressSame}
								sx={{ width: "6rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_state'
								label='State'
								type='text'
								onChange={(e) => onChange(e)}
								id='c_state'
								autoComplete='c_state'
								disabled={isAddressSame}
								sx={{ width: "6rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_zip'
								label='Zip'
								type='number'
								onChange={(e) => onChange(e)}
								id='c_zip'
								autoComplete='c_zip'
								disabled={isAddressSame}
								sx={{ width: "4rem" }}
							/>
							<TextField
								size='small'
								margin='normal'
								variant='outlined'
								name='c_ext'
								label='+4'
								type='number'
								onChange={(e) => onChange(e)}
								id='c_ext'
								autoComplete='c_ext'
								disabled={isAddressSame}
								sx={{ width: "4rem" }}
							/>
							<Divider />
						</Grid>

						<Grid item xs={4}>
							<Typography component='h3' variant='h5'>
								Billing
							</Typography>
							<FormControl>
								<RadioGroup
									value={isMonthly}
									onChange={() => setIsMonthly(isMonthly)}
									row
									aria-labelledby='demo-row-radio-buttons-group-label'
									name='row-radio-buttons-group'>
									<FormControlLabel
										value={true}
										control={<Radio />}
										label='Monthly'
									/>
									<FormControlLabel
										value={false}
										control={<Radio />}
										label='Annually'
									/>
								</RadioGroup>
							</FormControl>
							<Typography component='h5' variant='h6'>
								Select your Plan
							</Typography>
							<FormControl>
								<RadioGroup
									value={plan}
									onChange={() => setPlan()}
									row
									aria-labelledby='demo-row-radio-buttons-group-label'
									name='row-radio-buttons-group'>
									<FormControlLabel
										value={false}
										control={<Radio />}
										label='Plan 01'
									/>
									<FormControlLabel
										value={true}
										control={<Radio />}
										label='Plan 02'
									/>
								</RadioGroup>
							</FormControl>
							{/* <Stack direction='row' spacing={1} alignItems='center'>
								<Typography>Plan01</Typography>
								<Switch
									checked={plan}
									onChange={() => setPlan(plan)}
									inputProps={{ "aria-label": "controlled" }}
								/>
								<Typography>Plan02</Typography>
							</Stack> */}
							<TableContainer mb={3}>
								<Table size='small'>
									<TableHead>
										<TableRow sx={{ background: "#796ef0" }}>
											<TableCell>
												<Typography color='white'>Per User</Typography>
											</TableCell>
											<TableCell>
												<Typography color='white'>No Users</Typography>
											</TableCell>
											<TableCell>
												<Typography color='white'>No Cases</Typography>
											</TableCell>
											<TableCell>
												<Typography color='white'>Total</Typography>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow>
											<TableCell>$ 35.00</TableCell>
											<TableCell>
												<TextField
													size='small'
													value={users}
													onChange={(e) => setUsers(e.target.value)}
												/>
											</TableCell>
											<TableCell>
												<TextField
													disabled
													size='small'
													value={cases}
													onChange={(e) => setCases(e.target.value)}
												/>
											</TableCell>
											<TableCell>= ${users * 35.0}</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>$ 25.00</TableCell>
											<TableCell>
												<TextField
													size='small'
													value={users2}
													onChange={(e) => setUsers2(e.target.value)}
												/>
											</TableCell>
											<TableCell>
												<TextField
													size='small'
													value={cases2}
													onChange={(e) => setCases2(e.target.value)}
												/>
											</TableCell>
											<TableCell>= ${25.0 * users2 + cases2 * 2}</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
							<LocalizationProvider dateAdapter={AdapterDateFns} mt={3}>
								<DesktopDatePicker
									label='Billing Date'
									inputFormat='MM/dd/yyyy'
									value={billingDate}
									onChange={handleChange}
									renderInput={(params) => (
										<TextField {...params} fullWidth size='samll' />
									)}
								/>
							</LocalizationProvider>
						</Grid>
						<Grid item xs={3}>
							<TableContainer
								component={Paper}
								elevation={plan ? 3 : 15}
								p={2}
								sx={plan ? null : { border: "2px solid #796ef0" }}>
								<Typography
									variant='h5'
									component='h4'
									align='center'
									m={2}
									sx={{ fontWeight: 700 }}
									color='primary'>
									Plan 01
								</Typography>
								<Table size='small'>
									<TableHead>
										<TableRow sx={{ background: "#796ef0" }}>
											<TableCell>
												{" "}
												<Typography color='white'>User Tiers </Typography>
											</TableCell>
											<TableCell>
												{" "}
												<Typography color='white'>Price Per User </Typography>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow>
											<TableCell> 1-25</TableCell>
											<TableCell>$ 35.00 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 26-50 </TableCell>
											<TableCell> $ 45.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 51-75 </TableCell>
											<TableCell> $ 55.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 76-100 </TableCell>
											<TableCell> $ 65.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 101-150 </TableCell>
											<TableCell> $ 75.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 151-200 </TableCell>
											<TableCell> $ 85.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 201-300 </TableCell>
											<TableCell> $ 95.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 301-500 </TableCell>
											<TableCell> $ 105.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 500 </TableCell>
											<TableCell> $ 115.00</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
						<Grid item xs={5}>
							<TableContainer
								component={Paper}
								elevation={plan ? 15 : 3}
								p={2}
								sx={plan ? { border: "2px solid #796ef0" } : null}>
								<Typography
									variant='h5'
									component='h4'
									align='center'
									m={2}
									sx={{ fontWeight: 700 }}
									color='primary'>
									Plan 02
								</Typography>
								<Table size='small'>
									<TableHead>
										<TableRow sx={{ background: "#796ef0" }}>
											<TableCell>
												<Typography color='white'> User Tiers</Typography>
											</TableCell>
											<TableCell>
												<Typography color='white'> Price Per User</Typography>
											</TableCell>
											<TableCell>
												<Typography color='white'> Price Per Case </Typography>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow>
											<TableCell> 1-25</TableCell>
											<TableCell>$ 25.00 </TableCell>
											<TableCell>$ 2.00 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 26-50 </TableCell>
											<TableCell> $ 30.00</TableCell>
											<TableCell> $ 1.90 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 51-75 </TableCell>
											<TableCell> $ 35.00</TableCell>
											<TableCell> $ 1.75 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 76-100 </TableCell>
											<TableCell> $ 45.00</TableCell>
											<TableCell> $ 1.65 </TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 101-150 </TableCell>
											<TableCell> $ 50.00</TableCell>
											<TableCell> $ 1.50</TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 151-200 </TableCell>
											<TableCell> $ 55.00</TableCell>
											<TableCell> $ 1.40</TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 201-300 </TableCell>
											<TableCell> $ 60.00</TableCell>
											<TableCell> $ 1.25</TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 301-500 </TableCell>
											<TableCell> $ 65.00</TableCell>
											<TableCell> $ 1.20</TableCell>
										</TableRow>
										<TableRow>
											<TableCell> 500 </TableCell>
											<TableCell> $ 75.00</TableCell>
											<TableCell> $ 1.00</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
						<Divider />
					</Grid>
					<Grid container spacing={2} mt={2}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								id='outlined-multiline-static'
								multiline
								rows={4}
								defaultValue='Term & Conditions'
							/>
							<Box sx={{ float: "right" }}>
								<TextField
									size='small'
									fullWidth
									margin='normal'
									variant='outlined'
									name='full_name'
									label='Type Name'
									type='text'
									mb={2}
									onChange={(e) => onChange(e)}
									id='full_name'
									autoComplete='full_name'
									sx={{ width: "20rem" }}
									required
								/>
								<br />
								<Button
									type='submit'
									variant='contained'
									mt={3}
									sx={{ width: "10rem", float: "right" }}>
									+ Create
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</Fragment>
	);
};
export default RegisterCompany;
