import { memo } from 'react'
import { FormControl, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
	formControl: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		margin: "auto",
	}
}));
const textFieldSx = { width: 220 };
const inputLabelProps = { shrink: true }
function DatePicker(props) {
    const classes = useStyles()
    return (
        <FormControl
				variant={props.formControlVariant || "outlined"}
				className={props.formControlClass || classes.formControl}
				size={props.formControlSize || "small"}
        >
            <TextField
                label={props.label || "Date"}
                type="date"
                value={props.value ? props.value.$formatDate("YYYY-MM-DD") : Date.$Current.$formatDate("YYYY-MM-DD")}
                variant={props.textFieldVariant || "outlined"}
                sx={props.textFieldSx || textFieldSx}
                size={props.textFieldSize || "small"}
                InputLabelProps={props.textFieldInputLabelProps || inputLabelProps}
                onChange={props.onChange || Function.prototype}
            />
        </FormControl>
    )
}

export default memo(DatePicker)