import {
	Backdrop, Box, Modal, Fade,
	Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { memo } from 'react';
import SelectBy from "./SelectBy"
import OrderStatuses from "./OrderStatuses"
import StartDate from './StartDate';
import EndDate from './EndDate';
import CalendarDateType from "./CalendarDateType"
import FilterByContent from './FilterByContent';
import RecordsList from './RecordsList';

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

function FilterModal(props) {
	const classes = useStyles()
	return (
		!props.open
			? null
			: (
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
										<StartDate />
										<EndDate />
										<SelectBy />
									</div>
									<div className={classes.filterMainSubSection}>
										<OrderStatuses />
										<CalendarDateType />
									</div>
									<div className={classes.filterMainSubSection}>
										<FilterByContent />
									</div>
									<div className={classes.filterMainSubSection}>
										<RecordsList />
									</div>
								</div>
								<div className={classes.filterButtonSection}>
									<Button
										variant="contained"
										color="primary"
										disabled={props.isProcessButtonDisable}
										onClick={e => {
											props.onProcess()
											props.closeFilter()
										}}
									>
										Process
									</Button>
									<Button
										variant="contained"
										color="primary"
										onClick={e => {
											props.onClear()
										}}
									>
										Clear
									</Button>
								</div>
							</Box>
						</Fade>
					</Modal>
				</div>
			)
	);
}

export default memo(FilterModal)