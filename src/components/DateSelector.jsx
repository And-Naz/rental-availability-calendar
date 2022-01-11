import { memo, useCallback } from "react"
import { FormControl, TextField } from '@mui/material'
import { useSelector, useDispatch } from "react-redux"
import {actionSetStartDate, actionSetEndDate} from "../store/ReduxActions"

function DateSelector(props) {
	const {startDate, endDate} = useSelector(state => state.filter)
	const dispatch = useDispatch()
	const onChangeStartDate = useCallback((e) => dispatch(actionSetStartDate(new Date(e.target.value))), []);
	const onChangeEndDate = useCallback((e) => dispatch(actionSetEndDate(new Date(e.target.value))), []);
	console.log("Render: DateSelector");
	return (
		<>
			<FormControl
				variant={props.formControlVariant || "outlined"}
				className={props.formControlClass || ""}
				size={props.formControlSize || "small"}
			>
				<TextField
					label="Start Date"
					type="date"
					value={startDate?.FormatDate("YYYY-MM-DD") || Date.Current.FormatDate("YYYY-MM-DD")}
					variant={props.textFieldVariant ||  "outlined"}
					sx={props.textFieldSx || { width: 220 }}
					size={props.textFieldSize || "small"}
					InputLabelProps={props.textFieldInputLabelProps || { shrink: true }}
					onChange={ onChangeStartDate }
				/>
			</FormControl>
			<FormControl
				variant={props.formControlVariant || "outlined"}
				className={props.formControlClass || ""}
				size={props.formControlSize || "small"}
			>
				<TextField
					label="End Date"
					type="date"
					value={endDate?.FormatDate("YYYY-MM-DD") || Date.Current.DayAddedDate(10).FormatDate("YYYY-MM-DD")}
					variant={props.textFieldVariant ||  "outlined"}
					sx={props.textFieldSx || { width: 220 }}
					size={props.textFieldSize || "small"}
					InputLabelProps={props.textFieldInputLabelProps || { shrink: true }}
					onChange={ onChangeEndDate }
				/>
			</FormControl>
		</>
	)
}
export default memo(DateSelector);