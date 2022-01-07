import { useMemo, memo } from 'react';
import filterIcons from '../icons/icon-filter.svg'
import DateSelector from './DateSelector';
import { AppBar, Toolbar, Button } from '@mui/material';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
	dateWrapper: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		marginTop: "5px",
		marginBottom: "5px"
	},
	formControl: {
		minWidth: 120,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		marginLeft: "2rem !important"
	}
}));

const imgAttributes = {
	src: filterIcons,
	style: {
		width: '1.75rem'
	}
}

function BoardHeader(props) {
	const classes = useStyles()
	console.log("Render: BoardHeader");
	return (
		<div className={props.className}>
			<AppBar position="static">
				<Toolbar>
					<Button color="inherit" onClick={props.openFilter}>
						<img {...imgAttributes} alt="filter" />
					</Button>
					<div className={classes.dateWrapper} color='#000'>
						<DateSelector formControlClass={classes.formControl} />
					</div>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default memo(BoardHeader)