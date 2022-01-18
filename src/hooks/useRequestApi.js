import { useState, useMemo, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux"
import { actionSetCurrentRecords } from "../store/ReduxActions";
import Request from "../api/Request"
import apiInterFace from "../api/apiInterface"
const getFilter = state => state.filter;
const getCurrentRecords = state => state.records.current;
function useRequestApi(defaultChuncks = [0, 99]) {
	const dispatch = useDispatch()
	const records = useSelector(getCurrentRecords)
	const filter = useSelector(getFilter)
	const [initApi] = useState(new Request(apiInterFace, filter))
	const api = useMemo(() => initApi.Update(filter), [filter])
	const [status, setStatus] = useState(api.Status)
	const [chuncks, setChunck] = useState(defaultChuncks)
	const getErrorStack = () => api.ErrorsStack
	const getTotalCount = () => api.TotalCount
	const load = useCallback((_chuncks) => setChunck(_chuncks), [])
	useEffect(() => {
		dispatch(actionSetCurrentRecords(api.Load(...chuncks)))
	}, [chuncks, filter])
	useEffect(() => { setStatus(api.Status) }, [api.Status, chuncks, filter])
	return {
		records,
		status,
		load,
		getErrorStack,
		getTotalCount
	}
}
export default useRequestApi
