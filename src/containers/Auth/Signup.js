/** @format */

import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import {
	Avatar,
	Button,
	Paper,
	Grid,
	Box,
	Typography,
	TextField,
	FormControlLabel,
	FormLabel,
	FormGroup,
	Checkbox,
	RadioGroup,
	Alert,
	Radio,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSelector, useDispatch } from "react-redux";
import BackgroundImage from "../../asserts/signup_light.png";
import { signUp, resetError } from "../../redux/features/authSlice";

const Signup = () => {
	const { user, isLoading, isError, isSuccess, isCreated, message } =
		useSelector((state) => state.auth);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const dispatch = useDispatch();

	const [accountCreated, setAccountCreated] = useState(false);
	const [isFirm, setIsFirm] = useState(false);
	const [errorCode, setErrorCode] = useState(0);
	const [formData, setFormData] = useState({
		username: "",
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		re_password: "",
	});

	const { username, email, first_name, last_name, password, re_password } =
		formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	useEffect(() => {
		if (isError) {
			let error_code = parseInt(message.substr(-3));
			setErrorCode(error_code);
			setTimeout(function () {
				dispatch(resetError());
				setErrorCode(0);
			}, 5000);
		}
	}, [user, isError, isSuccess, message, dispatch]);

	const alertBox = () => {
		if (errorCode === 0) {
			return " ";
		} else if (errorCode === 409) {
			return "This Domain Already exists Please contact to your Firm to create your Account.";
		} else if (errorCode === 405) {
			return "This Domain is Not Allowed. Please Try again with Different email address";
		} else if (errorCode === 400) {
			return "Incorrect Data, Please try again";
		}
	};
	if (isLoading) {
		return (
			<Box mt={5} sx={{ display: "flex" }}>
				<CircularProgress />
			</Box>
		);
	}

	const onSubmit = (e) => {
		if (password === re_password) {
			const userData = {
				username,
				first_name,
				last_name,
				email,
				password,
			};
			dispatch(signUp(userData));
			if (isSuccess) {
				setAccountCreated(true);
			}
		} else {
			console.log("You are entering the wrong password, Please type again!");
		}
	};

	if (isCreated) {
		return <Redirect to='/login' />;
	}

	return (
		<Grid container component='main' sx={{ height: "85vh" }}>
			<Grid
				item
				xs={false}
				sm={4}
				md={8}
				sx={{
					backgroundImage: `url(${BackgroundImage})`,
					backgroundRepeat: "no-repeat",
					backgroundColor: (t) =>
						t.palette.mode === "light"
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			<Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					{isError ? <Alert severity='warning'> {alertBox()}</Alert> : null}
					<Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign Up
					</Typography>
					<Box
						component='form'
						autoComplete='off'
						Validate
						sx={{ mt: 1 }}
						onSubmit={(e) => onSubmit(e)}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									margin='normal'
									required
									fullWidth
									variant='standard'
									id='username'
									label='Username'
									name='username'
									value={username}
									onChange={(e) => onChange(e)}
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									margin='normal'
									required
									fullWidth
									variant='standard'
									id='first_name'
									label='First Name'
									name='first_name'
									value={first_name}
									onChange={(e) => onChange(e)}
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									margin='normal'
									required
									fullWidth
									variant='standard'
									id='last_name'
									label='Last Name'
									name='last_name'
									autoComplete='last_name'
									value={last_name}
									onChange={(e) => onChange(e)}
									autoFocus
								/>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<TextField
								margin='normal'
								required
								fullWidth
								variant='standard'
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								value={email}
								onChange={(e) => onChange(e)}
								autoFocus
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								margin='normal'
								required
								fullWidth
								variant='standard'
								name='password'
								label='Password'
								type='password'
								id='password'
								value={password}
								onChange={(e) => onChange(e)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								margin='normal'
								required
								fullWidth
								variant='standard'
								name='re_password'
								label='Confirm Password'
								type='password'
								value={re_password}
								onChange={(e) => onChange(e)}
								id='re_password'
							/>
						</Grid>
						<Grid item xs={12}>
							<FormGroup>
								<FormControlLabel
									control={<Checkbox />}
									label='I Agree to all Terms and Contidions'
								/>
							</FormGroup>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Register
						</Button>
					</Box>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Link to='/login' variant='body2'>
								{"Already have an account? Sign in"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Signup;
