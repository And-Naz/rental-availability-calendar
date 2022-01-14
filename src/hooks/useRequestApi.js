import Request from "../api/Request"
import apiInterFace from "../api/apiInterface"
import {useSelector} from "react-redux"
import { useCallback, useState, useMemo } from "react";
const getFilter = state => state.filter;
function useRequestApi() {
    const [records, setRecords] = useState([])
    const filter = useSelector(getFilter)
    const [initApi] = useState(new Request(apiInterFace, filter))
    const api = useMemo(() => initApi.Update(filter), [filter])
    const load = useCallback(async (_chuncks) => { 
        const data = await api.Load(..._chuncks)
        setRecords(data)
    },[api])
    const getStatus = useCallback(() => api.Status, [api])
    const getErrorStack = useCallback(() => api.ErrorsStack, [api])

    return {
        records,
        load,
        getStatus,
        getErrorStack
    }
}

export default useRequestApi
