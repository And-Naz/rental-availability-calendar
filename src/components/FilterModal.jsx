import { memo } from 'react';
import { useSelector } from 'react-redux';
import * as SelectBy from "../constants/SelectBy"
import * as OrderStatuses from "../constants/OrderStatuses"
import {
	Backdrop, Box, Modal, Fade,
	Button, FormControl, FormLabel,
	FormControlLabel, RadioGroup, Radio,
	TextField, InputLabel, Select, MenuItem
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import DateSelector from "./DateSelector";
import ByOrdersList from './ByOrdersList';
import ByItemsList from './ByItemsList';
const useStyles = makeStyles((theme) => ({
	filterButtonSection: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		"& > button": {
			marginLeft: "0.5rem"
		},
		"&:first-child": {
			marginBottom: "0.5rem"
		},
		"&:last-child": {
			marginTop: "0.5rem"
		}
	},
	filterMainSection: {
		display: "flex",
		flexDirection: "column"
	},
	filterMainSubSection: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		margin: "5px"
	},
	formControl: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		margin: "auto",
	},
	select: {
		color: "#212121",
		width: 120,
	}
}));
const boxStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 650,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	padding: '0.25rem',
	display: 'flex',
	flexDirection: 'column'
};
const onChangeEndDate = Function.prototype;
const onChangeStartDate = Function.prototype;
const onChangeSelectBy = Function.prototype;
const onChangeOrderStatus = Function.prototype;
function FilterModal(props) {
	const classes = useStyles()
	console.log("Render: FilterModal");
	const { selectBy, orderStatus, startDate, endDate } = useSelector(state => state.filter)
	console.colorLog(`selectBy: ${selectBy}`, "info")
	console.colorLog(`orderStatus: ${orderStatus}`, "info")
	console.colorLog(`startDate: ${startDate}`, "info")
	console.colorLog(`endDate: ${endDate}`, "info")
	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={props.open}
				onClose={props.closeFilter}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 200,
				}}
			>
				<Fade in={props.open}>
					<Box sx={boxStyle}>
						<div className={classes.filterButtonSection}>
							<Button
								variant="contained"
								color="secondary"
								onClick={props.closeFilter}
							>
								X
							</Button>
						</div>
						<div className={classes.filterMainSection}>
							<div className={classes.filterMainSubSection}>
								<DateSelector
									formControlClass={classes.formControl}
									startDate={startDate}
									onChangeStartDate={onChangeStartDate}
									endDate={endDate}
									onChangeEndDate={onChangeEndDate}
								/>
								<FormControl
									variant="outlined"
									className={classes.formControl}
									size="small"
								>
									<InputLabel id="demo-simple-select-outlined-label" color="primary">Select By</InputLabel>
									<Select
										labelId="demo-simple-select-outlined-label"
										id="demo-simple-select-outlined"
										value={selectBy}
										onChange={onChangeSelectBy}
										label="Select By"
										color="primary"
										className={classes.select}
									>
										{
											Object.keys(SelectBy).map(sbKey => <MenuItem key={sbKey} value={SelectBy[sbKey].value}>{SelectBy[sbKey].desc}</MenuItem>)
										}
									</Select>
								</FormControl>
							</div>
							<div className={classes.filterMainSubSection}>
								<FormControl className={classes.formControl}>
									<FormLabel component="span">Order Status</FormLabel>
									<RadioGroup row value={orderStatus} onChange={onChangeOrderStatus}>
										{
											Object.keys(OrderStatuses).map(osKey => {
												return (
													<FormControlLabel
														key={osKey}
														value={OrderStatuses[osKey].value}
														control={<Radio color="primary" />}
														label={OrderStatuses[osKey].desc}
													/>
												)
											})
										}
									</RadioGroup>
								</FormControl>
								<FormControl
									className={classes.formControl}
								>
									<TextField
										label="Filter by content"
										variant="outlined"
										size="small"
									/>
								</FormControl>
							</div>
							<div className={classes.filterMainSubSection}>
								{
									((sb) => {
										switch (sb) {
											case SelectBy.OrdersType:
												return <ByOrdersList />;
											case SelectBy.ItemsType:
												return <ByItemsList />;
											default:
												return null;
										}
									})(selectBy)
								}
							</div>
						</div>
						<div className={classes.filterButtonSection}>
							<Button
								variant="contained"
								color="primary"
							>
								Process
							</Button>
							<Button
								variant="contained"
								color="primary"
							>
								Clear
							</Button>
						</div>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}

export default memo(FilterModal)