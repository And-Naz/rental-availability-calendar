import SelectOption from "./uiKits/SelectOption"
import { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionSetCalendarType } from '../store/ReduxActions'
import { FILTER_DATE_TYPE } from "../constants/FilterDateType"
export default function SelectBy() {
	const getSelectBy = useCallback(state => state?.filter?.calendarType, [])
	const value = useSelector(getSelectBy)
	const dispatch = useDispatch()
	const onChange = useCallback(e => {
		dispatch(actionSetCalendarType(Number(e.target.value)))
	}, [])
	const list = useMemo(() => [{ value: FILTER_DATE_TYPE.WEEK, desc: "Weeks" }, { value: FILTER_DATE_TYPE.MONTH, desc: "Month" }], [])
	return (
		<SelectOption value={value} onChange={onChange} list={list} label="Calendar Date Type" />
	)
}
