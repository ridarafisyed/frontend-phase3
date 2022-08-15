/** @format */

import React, { Fragment } from "react";

// import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// import axios from "axios";
// import { CONFIG } from "../../api/MatterApi";
// import { useToggle } from "../../context/useToggle";

// const URL_ADD_STATE = ``;
// const URL_ADD_CITY = `${process.env.REACT_APP_API_ADDRESS_URL}/city/`;
// const URL_ADD_COUNTY = ``;
// const URL_ADD_ZIPCODE = `${process.env.REACT_APP_API_ADDRESS_URL}/zip-code/`;

const AddComponents = () => {
	return (
		<Fragment>
			<FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
				<InputLabel id='demo-select-small'>State</InputLabel>
				<Select
					labelId='demo-select-small'
					id='demo-select-small'
					label='State'
					// onChange={handleState}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
				</Select>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
				<InputLabel id='demo-select-small'>County</InputLabel>
				<Select
					labelId='demo-select-small'
					id='demo-select-small'
					label='County'
					// onChange={handleCounty}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
				</Select>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
				<InputLabel id='demo-select-small'>City</InputLabel>
				<Select
					labelId='demo-select-small'
					id='demo-select-small'
					label='City'
					// onChange={handleCity}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
				</Select>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
				<InputLabel id='demo-select-small'>ZipCode</InputLabel>
				<Select
					labelId='demo-select-small'
					id='demo-select-small'
					label='City'
					// onChange={handleCity}
				>
					<MenuItem value=''>
						<em>None</em>
					</MenuItem>
				</Select>
			</FormControl>
		</Fragment>
	);
};

export default AddComponents;
