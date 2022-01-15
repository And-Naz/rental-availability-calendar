import {memo} from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
	formControl: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		margin: "auto",
	},
    select: {
		color: "#212121",
		width: 140,
	}
}));
function SelectOption(props) {
    const classes = useStyles()
    return (
        <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
        >
            <InputLabel id="demo-simple-select-outlined-label" color="primary">{props.label || "Select"}</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={props.value || null}
                onChange={props.onChange || Function.prototype}
                label={props.label || "Select"}
                color="primary"
                className={classes.select}
            >
                {
                    Array.isArray(props.list) && props.list.map(({value, desc}) => <MenuItem key={value} value={value}>{desc}</MenuItem>)
                }
            </Select>
        </FormControl>
    )
}

export default memo(SelectOption)
