/** @format */
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import "./style.css";

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

export default function RoleFunctions2({ id }) {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	const role = useSelector((state) => state.role.role);
	// const isLoading = useSelector((state)=>state.role.role)
	const [isAll, setIsAll] = useState(false);
	const dispatch = useDispatch();

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
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<Accordion
				expanded={expanded === "panel1"}
				onChange={handleChange("panel1")}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1bh-content'
					id='panel1bh-header'>
					<Typography sx={{ width: "33%", flexShrink: 0 }}>
						General settings
					</Typography>
					<Typography sx={{ color: "text.secondary" }}>
						I am an accordion
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
						Aliquam eget maximus est, id dignissim quam.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
