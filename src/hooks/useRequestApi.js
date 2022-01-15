import Request from "../api/Request"
import apiInterFace from "../api/apiInterface"
import { useSelector, useDispatch } from "react-redux"
import { useState, useMemo, useEffect, useCallback } from "react";
import { actionSetRecords } from "../store/ReduxActions";
const getFilter = state => state.filter;
const getRecords = state => state.records.records;
function useRequestApi(defaultChuncks = [0, 99]) {
	const dispatch = useDispatch()
	const records = useSelector(getRecords)
	const filter = useSelector(getFilter)
	const [initApi] = useState(new Request(apiInterFace, filter))
	const api = useMemo(() => initApi.Update(filter), [filter])
	const [chuncks, setChunck] = useState(defaultChuncks)
	const getStatus = () => api.Status
	const getErrorStack = () => api.ErrorsStack
	const getCount = () => api.Count
	const load = useCallback((_chuncks) => setChunck(_chuncks), [])
	useEffect(() => { dispatch(actionSetRecords(api.Load(...chuncks))) }, [chuncks, filter])
	return {
		records,
		load,
		getStatus,
		getErrorStack,
		getCount
	}
}

export default useRequestApi
