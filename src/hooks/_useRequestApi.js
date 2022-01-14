import Request from "../api/Request"
import apiInterFace from "../api/apiInterface"
import {useSelector} from "react-redux"
import { useCallback, useState, useEffect, useMemo } from "react";
import useUpdateEffect from './useUpdateEffect'
import {OrdersType} from "../constants/SelectBy"
const _init = {initSteps: 100, initStart: 0, initEnd: 99}
const getFilter = state => state.filter;

function useRequestApi() {
    const filter = useSelector(getFilter)
    const recordKeyNames = useMemo(() => {
        const keys = []
        if (filter.selectBy === OrdersType.value) {
            keys.push("OrderNbr")
            keys.push("InventoryCD")
            keys.push("SerialNbr")
        } else {
            keys.push("InventoryCD")
            keys.push("SerialNbr")
        }
        return keys
    }, [filter])
    const [requestChuncks, setRequestChuncks] = useState(_init)
    const [totalCount, setTotalCount] = useState(0)
	const [api, setApi] = useState(new Request(apiInterFace, {...filter, ...requestChuncks}))
    const [records, setRecords] = useState([])
    const load = useCallback(async () => {
        const _totalCount = await api.RecordsTotalCount()
        const isFromCahce = await api.Load(requestChuncks.initStart, requestChuncks.initEnd)
        setRecords(api.Records)
        if (!isFromCahce) {
            setRequestChuncks(prev => {
                return {
                    initSteps: prev.initSteps,
                    initStart: prev.initStart + prev.initSteps,
                    initEnd: prev.initEnd + prev.initSteps
                }
            })
        }
        setTotalCount(_totalCount)
    }, [api])
	useUpdateEffect(() => {
        setApi(new Request(apiInterFace, {...filter, ...requestChuncks}))
	}, [filter])
	useEffect(() => {
        load()
	}, [api])
    return {
        records,
        totalCount,
        load,
        recordKeyNames,
        get status() { return api.Status}
    }
}
export default useRequestApi
