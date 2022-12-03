import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"
import { actionSetCurrentRecords, actionSetCurrentRecordsSync } from "../store/ReduxActions";
import Request from "../api/Request"
import apiInterFace from "../api/apiInterface"
const getFilter = state => state.filter;
const getCurrentRecords = state => state.records.current;
function useRequestApi(defaultChuncks = [0, 99]) {
	const plugRef = useRef(true)
	const dispatch = useDispatch()
	const filter = useSelector(getFilter)
	const records = useSelector(getCurrentRecords)
	const [initApi] = useState(new Request(apiInterFace, filter))
	const api = useMemo(() => initApi.Update(filter), [initApi, filter])
	const [status, setStatus] = useState(api.Status)
	const [chuncks, setChunck] = useState(defaultChuncks)
	const getErrorStack = () => api.ErrorsStack
	const getTotalCount = () => api.TotalCount
	const load = useCallback((_chuncks) => setChunck(_chuncks), [])
	useEffect(() => {
		dispatch(actionSetCurrentRecords(api.Load(...chuncks)))
	}, [api, dispatch, chuncks, filter])
	useEffect(() => {
		if (plugRef.current) {
			plugRef.current = false
			dispatch(actionSetCurrentRecordsSync([]))	
		}
	}, [dispatch])
	useEffect(() => { setStatus(api.Status) }, [api.Status, chuncks, filter])
	return {
		records: plugRef.current ? [] : records,
		status,
		load,
		getErrorStack,
		getTotalCount
	}
}
export default useRequestApi
