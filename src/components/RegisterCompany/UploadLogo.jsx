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
import { useControlled } from "@mui/material";

const UploadLogo = () => {
	const { user } = useSelector((state) => state.auth.user);
	const [logo, setLogo] = useState(null);

	// const onChange = (e) => {
	// 	if ([e.target.name] == "logo") {
	// 		setLogo(e.target.file);
	// 	}
	// };
	const handleImageChange = (e) => {
		setLogo({
			logo: e.target.files[0],
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(logo);
		let form_data = new FormData();
		form_data.append("logo", logo);
		// console.log(form_data);
		const URL_LOGO = `${process.env.REACT_APP_API_URL}/api/upload-logo/${user.firm.id}/`;
		const config = {
			headers: {
				"Content-Type":
					"multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
			},
		};
		const logo_data = JSON.stringify({
			logo: logo[0],
		});

		axios
			.put(URL_LOGO, logo_data, config)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<Box component='form' Validate mb={6} onSubmit={(e) => handleSubmit(e)}>
			<Grid item xs={12}>
				<Typography component='h3' variant='h5'>
					Company Information
				</Typography>

				<input
					type='file'
					id='image'
					accept='image/png, image/jpeg'
					onChange={handleImageChange}
				/>
				<Divider />
				<Button
					type='submit'
					variant='contained'
					mt={3}
					sx={{ width: "10rem", float: "right" }}>
					+ Create
				</Button>
			</Grid>
		</Box>
	);
};

export default UploadLogo;
