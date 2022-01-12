import DatePicker from "./uiKits/DatePicker"
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionSetStartDate } from '../store/ReduxActions'
export default function StartDate() {
    const getStart = useCallback(state => state?.filter?.startDate, [])
    const value = useSelector(getStart)
    const dispatch = useDispatch()
    const onChange = useCallback(e => dispatch(actionSetStartDate(new Date(e.target.value))), [dispatch])
    console.log("Render: StartDate");
    return (
        <DatePicker value={value} onChange={onChange} label="Start Date" />
    )
}
