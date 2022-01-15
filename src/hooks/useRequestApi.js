import Request from "../api/Request"
import apiInterFace from "../api/apiInterface"
import {useSelector} from "react-redux"
import { useState, useMemo, useEffect } from "react";
// import useUpdateEffect from "./useUpdateEffect"
const getFilter = state => state.filter;
function useRequestApi(defaultChuncks = [0, 99]) {
    const [records, setRecords] = useState([])
    const filter = useSelector(getFilter)
    const [initApi] = useState(new Request(apiInterFace, filter))
    const api = useMemo(() => initApi.Update(filter), [filter])
    const [chuncks, setChunck] = useState(defaultChuncks)
    const getStatus = () => api.Status
    const getErrorStack = () => api.ErrorsStack
    const getCount = () => api.Count
    function load(_chuncks) {
        setChunck(_chuncks)
    }
    async function _loadRecords(ch) {
        const d = await api.Load(...ch)
        console.log(d);
        await setRecords(d)
    }
    useEffect(() => {
        _loadRecords(chuncks)
    }, [chuncks, filter])
    return {
        records,
        load,
        getStatus,
        getErrorStack,
        getCount
    }
}

export default useRequestApi
