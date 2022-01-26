
import { useCallback, useEffect, useMemo, useState } from "react";
import {useSelector} from "react-redux"
import {OrdersType} from "../constants/SelectBy";
import GenerateItemList from "../helpers/GenerateItemList"
function getState(state) {
    return [state.filter.selectBy, state.records.selected]
}
function useDrowInfo() {
    const [selectBy, selected] = useSelector(getState)
    const [data, setData] = useState([])
    const onProcess = useCallback(() => {
        if (selectBy === OrdersType.value) {
            setData(GenerateItemList(selected))
        } else {

        }
    }, [selected])
    const onClear = useCallback(() => {
        setData([])
    }, [])
    useEffect(() => {
        setData([])
    }, [selectBy, selected])
    return {
        data,
        onProcess,
        onClear
    }
}

export default useDrowInfo
