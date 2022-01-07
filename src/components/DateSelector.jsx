import useRecordsContext from "../Hooks/useRecordsContext"
import { FormControl, TextField } from '@mui/material'
const defaults = {
    formControlVariant: "outlined",
    formControlClass: "",
    formControlSize: "small",
    textFieldSx: {width: 220},
    textFieldVariant: "outlined",
    textFieldSize: "small",
    textFieldInputLabelProps: {shrink: true},
    startDateDefaultValue: Date.Current.FormatDate("YYYY-MM-DD"),
    endDateDefaultValue: Date.Current.DayAddedDate(10).FormatDate("YYYY-MM-DD"),
    onChange: Function.prototype
}
function DateSelector(props) {
    const { Value } = useRecordsContext()
    console.log("Render: DateSelector");
    return (
        <>
            <FormControl 
                variant={props.formControlVariant || defaults.formControlVariant}
                className={props.formControlClass || defaults.formControlClass}
                size={props.formControlSize || defaults.formControlSize}
            >
                <TextField
                    label="Start Date"
                    type="date"
                    value={Value?.startDate?.FormatDate("YYYY-MM-DD") || defaults.startDateDefaultValue}
                    variant={props.textFieldVariant || defaults.textFieldVariant}
                    sx={props.textFieldSx || defaults.textFieldSx}
                    size={props.textFieldSize || defaults.textFieldSize}
                    InputLabelProps={props.textFieldInputLabelProps || defaults.textFieldInputLabelProps}
                    onChange={ Value?.onChangeStartDate || defaults.onChange}
                />
            </FormControl>
            <FormControl 
                variant={props.formControlVariant || defaults.formControlVariant}
                className={props.formControlClass || defaults.formControlClass}
                size={props.formControlSize || defaults.formControlSize}
            >
                <TextField
                    label="End Date"
                    type="date"
                    value={Value?.endDate?.FormatDate("YYYY-MM-DD") || defaults.endDateDefaultValue}
                    variant={props.textFieldVariant || defaults.textFieldVariant}
                    sx={props.textFieldSx || defaults.textFieldSx}
                    size={props.textFieldSize || defaults.textFieldSize}
                    InputLabelProps={props.textFieldInputLabelProps || defaults.textFieldInputLabelProps}
                    onChange={ Value?.onChangeEndDate || defaults.onChange}
                />
            </FormControl>
        </>
    )
}
export default DateSelector