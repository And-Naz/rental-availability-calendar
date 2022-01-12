import SelectOption from "./uiKits/SelectOption"
import { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionSetSelectBy } from '../store/ReduxActions'
import * as SelectByConstants from "../constants/SelectBy"
export default function SelectBy() {
    const getSelectBy = useCallback(state => state?.filter?.selectBy, [])
    const value = useSelector(getSelectBy)
    const dispatch = useDispatch()
    const onChange = useCallback(e => dispatch(actionSetSelectBy(e.target.value)), [dispatch])
    const list = useMemo(() => Object.keys(SelectByConstants).map(sbKeys => SelectByConstants[sbKeys]), [])
    console.log("Render: SelectBy");
    return (
        <SelectOption value={value} onChange={onChange} list={list} label="Select By"/>
    )
}
