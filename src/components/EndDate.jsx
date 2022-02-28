import DatePicker from "./uiKits/DatePicker"
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionSetEndDate } from '../store/ReduxActions'
export default function EndDate() {
    const getEnd = useCallback(state => state?.filter?.endDate, [])
    const value = useSelector(getEnd)
    const dispatch = useDispatch()
    const onChange = useCallback(e => dispatch(actionSetEndDate(new Date(e.target.value))), [dispatch])
    return (
        <DatePicker value={value} onChange={onChange} label="End Date" />
    )
}
