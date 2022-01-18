import useRequestApi from '../hooks/useRequestApi';
import { useState, useCallback, useEffect } from 'react';
import PaginatedList from "./uiKits/PaginatedList"
import { InProcess } from "../constants/StatusesOfRequest"
import { useDispatch } from "react-redux"
import { actionSetCurrentRecords, actionSetSelectedRecords } from "../store/ReduxActions";
import useUpdateEffect from "../hooks/useUpdateEffect"
import useFindAndMutateFromArray from '../hooks/useFindAndMutateFromArray';
function ByItemsList(props) {
	const dispatch = useDispatch()
	const steps = 50;
	const [chuncks, setChuncks] = useState([0, 49])
	const goToPage = useCallback(page => setChuncks([steps * page, (steps * (page + 1)) - 1]), [])
	const { records, status, errorStack, getTotalCount, load } = useRequestApi(chuncks)
	const [activeItem, setActiveItem] = useState(null)
	const [activeSerial, setActiveSerial] = useState(null)
	const changeActiveItem = useCallback((item) => { setActiveItem(item) }, [])
	const changeActiveSerial = useCallback((serial) => { setActiveSerial(serial) }, [])
	/* -> Don't use === because then need to convert to string  */
	const serials = useFindAndMutateFromArray(records, d => (d.InventoryCD == activeItem && d.IsSerial), d => {return d ? d.SerialsInfo : []}, [records, activeItem])
	useEffect(() => {
		return () => {
			dispatch(actionSetCurrentRecords(Promise.resolve([])))
			dispatch(actionSetSelectedRecords(Promise.resolve([])))
		}
	}, [])
	useUpdateEffect(() => { load(chuncks) }, [chuncks])
	return (
		<>
			<PaginatedList
				records={records}
				isLoading={(status === InProcess)}
				active={activeItem}
				changeActiv={changeActiveItem}
				pages={getTotalCount() <= steps ? 0 : Math.ceil(getTotalCount() / steps)}
				goToPage={goToPage}
				keyName="InventoryCD"
				displayName="InventoryCD"
			/>
			<PaginatedList
				records={serials}
				isLoading={(status === InProcess)}
				active={activeSerial}
				changeActiv={changeActiveSerial}
				pages={(Array.isArray(serials) && serials.length <= steps) ? 0 : Math.ceil(serials.length / steps)}
				goToPage={Function.prototype}
				keyName="SerialNbr"
				displayName="SerialNbr"
			/>
		</>
	)
}

export default ByItemsList;