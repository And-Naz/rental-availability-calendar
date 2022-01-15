import useRequestApi from '../hooks/useRequestApi';
import { useState, useCallback, useEffect } from 'react';
import PaginatedList from "./uiKits/PaginatedList"
import { InProcess } from "../constants/StatusesOfRequest"
import { useDispatch } from "react-redux"
import { actionSetRecords } from "../store/ReduxActions";
import useUpdateEffect from "../hooks/useUpdateEffect"
function ByOrdersList(props) {
	const dispatch = useDispatch()
	const steps = 50;
	const [chuncks, setChuncks] = useState([0, 49])
	const goToPage = useCallback(page => setChuncks([steps * page, (steps * (page + 1)) - 1]), [])
	const { records, status, errorStack, getTotalCount, load } = useRequestApi(chuncks)
	const [activs, setActivs] = useState({ order: null, item: null, lotSerial: null })
	const changeActiveOrder = useCallback((order) => { setActivs(prev => ({ ...prev, order })) }, [])
	// const changeActiveItem = useCallback((item) => { setActivs(prev => ({ ...prev, item })) }, [])
	// const changeActiveLotSerial = useCallback((lotSerial) => { setActivs(prev => ({ ...prev, lotSerial })) }, [])
	useEffect(() => {
		return () => {
			dispatch(actionSetRecords(Promise.resolve([])))
		}
	}, [])
	useUpdateEffect(() => { load(chuncks) }, [chuncks])
	return (
		<div>
			<PaginatedList
				records={records}
				isLoading={(status === InProcess)}
				active={activs.order}
				changeActiv={changeActiveOrder}
				recordsPerPage={steps - 1}
				pages={getTotalCount() <= steps ? 0 : Math.ceil(getTotalCount() / steps)}
				goToPage={goToPage}
				keyName="OrderNbr"
			/>
		</div>
	)
}

export default ByOrdersList;