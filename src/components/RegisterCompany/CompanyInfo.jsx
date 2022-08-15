/** @format */
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

const CompanyInfo = () => {
	const { user } = useSelector((state) => state.auth.user);
	const [isAddressSame, setIsAddressSame] = useToggle(false);
	const [billingDate, setBillingDate] = React.useState(new Date());
	const [logo, setLogo] = useState(null);
	const [isMonthly, setIsMonthly] = useToggle(true);
	const [plan, setPlan] = useToggle(false);

	const handleChange = (event) => {
		setBillingDate(event.target.value);
	};

	const [userData, setUserData] = useState({
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
	});
	const {
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
	} = userData;
	const onChange = (e) => {
		if ([e.target.name] == "logo") {
			setLogo(e.target.file);
		}
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};
	const URL_COMPANY = `${process.env.REACT_APP_API_URL}/api/create-firm/`;
	const config = { headers: { "Content-Type": "multipart/form-data" } };
	const handleSubmit = (e) => {
		const company_data = JSON.stringify({
			owner: user.id,
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

		axios
			.post(URL_COMPANY, company_data, config)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<Container>
			<Box component='form' Validate mb={6} onSubmit={(e) => handleSubmit(e)}>
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
					<TextField
						accept='image/*'
						className='input_image'
						margin='normal'
						name='logo'
						type='file'
						onChange={(e) => onChange(e)}
						id='logo'
						autoComplete='logo'
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
		</Container>
	);
};

export default CompanyInfo;
