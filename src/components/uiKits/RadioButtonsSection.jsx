import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, } from '@mui/material';
import {memo} from 'react'
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
	formControl: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		margin: "auto",
	}
}));
function RadioButtonsSection(props) {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <FormLabel component="span">{props.label}</FormLabel>
            <RadioGroup row value={props.value || null} onChange={props.onChange || Function.prototype}>
                {
                    Array.isArray(props.list) && props.list.map(({value, desc}) => {
                        return (
                            <FormControlLabel
                                key={value}
                                value={value}
                                control={<Radio color="primary" />}
                                label={desc}
                            />
                        )
                    })
                }
            </RadioGroup>
        </FormControl>
    )
}

export default memo(RadioButtonsSection);
