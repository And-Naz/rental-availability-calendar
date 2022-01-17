import {Checkbox as MuiCheckbox, FormControlLabel} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { forwardRef } from "react";
const useStyles = makeStyles({
	checkbox: {
		padding: "0px !important"
	},
    label: {
        marginLeft: "0px !important",
        marginRight: "0px !important"
    }
})
const Checkbox = forwardRef((props, ref) => {
    const classes = useStyles()
	if(!props?.children) {
		return (<MuiCheckbox className={classes.checkbox} ref={ref} {...props}/>)
	}
	return (
		<FormControlLabel
			className={classes.label}
            control={<MuiCheckbox className={classes.checkbox} ref={ref} {...props}/>}
            label={props.children}
        />
	)
})
export default Checkbox;
