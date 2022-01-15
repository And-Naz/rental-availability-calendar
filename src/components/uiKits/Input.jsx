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
function Input(props) {
    const classes = useStyles()
    return (
        <FormControl
			className={classes.formControl}
        >
            <TextField
                label={props.label || "Input"}
                variant={props.variant || "outlined"}
                size={props.size || "small"}
                value={props.value || ""}
                onChange={props.onChange || Function.prototype}
            />
        </FormControl>
    )
}

export default memo(Input);
