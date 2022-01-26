import useRequestApi from '../hooks/useRequestApi';
import { useState, useCallback, useEffect } from 'react';
import PaginatedList from "./uiKits/PaginatedList"
import { InProcess } from "../constants/StatusesOfRequest"
import { useDispatch } from "react-redux"
import useUpdateEffect from "../hooks/useUpdateEffect"
import useFindAndMutateFromArray from '../hooks/useFindAndMutateFromArray';
import useIsRecordSelected from "../hooks/useIsRecordSelected"
import useIsAllSelected from "../hooks/useIsAllSelected"
import { ItemsType } from "../constants/SelectBy"
import {
	actionAddItemInSelectedRecords, actionRemoveItemFromSelectedRecords,
	actionAddSerialInSelectedRecords, actionRemoveSerialFromSelectedRecords
} from "../store/ReduxActions";
function ByItemsList(props) {
	const dispatch = useDispatch()
	const steps = 50;
	const [chuncks, setChuncks] = useState([0, 49])
	const goToPage = useCallback(page => setChuncks([steps * page, (steps * (page + 1)) - 1]), [])
	const { records, status, errorStack, getTotalCount, load } = useRequestApi(chuncks)
	const [activeItem, setActiveItem] = useState(null)
	const [activeSerial, setActiveSerial] = useState(null)
	useUpdateEffect(() => { load(chuncks) }, [chuncks])
	const serials = useFindAndMutateFromArray(records, d => (d.InventoryCD === activeItem && d.IsSerial), d => { return d ? d.SerialsInfo : [] }, [records, activeItem])
	const { checkItem, checkSerial } = useIsRecordSelected()
	const onItemsListClick = useCallback(e => {
		let checkInState = false
		let value = null
		let target = e.target
		if (target.tagName === "UL") { return }
		if (target.tagName === "SPAN" && target.classList.contains("list__items__text")) {
			target = target.parentNode
		}
		else if (target.tagName === "INPUT" && target.type === "checkbox") {
			checkInState = true
			value = target.checked
			target = target.parentNode.parentNode
		}
		const rec = target.dataset.rec;
		setActiveItem(rec)
		if (checkInState && value !== null) {
			if (value) {
				dispatch(actionAddItemInSelectedRecords({ selectBy: ItemsType, data: rec }))
			} else {
				dispatch(actionRemoveItemFromSelectedRecords({ selectBy: ItemsType, data: rec }))
			}
		}
	}, [])
	const onSerialsListClick = useCallback(e => {
		let checkInState = false
		let value = null
		let target = e.target
		if (target.tagName === "UL") { return }
		if (target.tagName === "SPAN" && target.classList.contains("list__items__text")) {
			target = target.parentNode
		}
		else if (target.tagName === "INPUT" && target.type === "checkbox") {
			checkInState = true
			value = target.checked
			target = target.parentNode.parentNode
		}
		const rec = target.dataset.rec
		setActiveSerial(rec)
		if (checkInState && value !== null) {
			if (value) {
				dispatch(actionAddSerialInSelectedRecords({ selectBy: ItemsType, data: rec, item: activeItem }))
			} else {
				dispatch(actionRemoveSerialFromSelectedRecords({ selectBy: ItemsType, data: rec, item: activeItem }))
			}
		}
	}, [activeItem, activeSerial])
	const isItemChecked = useCallback((itemValue) => checkItem(itemValue), [checkItem])
	const isSerialChecked = useCallback((serialValue) => checkSerial(serialValue, activeItem), [checkSerial, activeItem])
	const selectAllItems = useCallback((e) => {
		if (e.target.checked) {
			records.forEach(l => {
				dispatch(actionAddItemInSelectedRecords({ selectBy: ItemsType, data: l.InventoryCD }))
			})
		} else {
			records.forEach(l => {
				dispatch(actionRemoveItemFromSelectedRecords({ selectBy: ItemsType, data: l.InventoryCD }))
			})
		}
	}, [records])
	const selectAllSerials = useCallback((e) => {
		if (e.target.checked) {
			serials.forEach(s => {
				dispatch(actionAddSerialInSelectedRecords({ selectBy: ItemsType, data: s.SerialNbr, item: activeItem }))
			})
		} else {
			serials.forEach(s => {
				dispatch(actionRemoveSerialFromSelectedRecords({ selectBy: ItemsType, data: s.SerialNbr, item: activeItem }))
			})
		}
	}, [serials, activeItem])
	const isAllItemsSelected = useIsAllSelected(records)
	const isAllSerialsSelected = useIsAllSelected(serials, selected => {
		return selected
		.find(i => i.InventoryCD === activeItem)
		?.SerialsInfo
	}, [activeItem])
	return (
		<>
			<PaginatedList
				records={records}
				isLoading={(status === InProcess)}
				active={activeItem}
				onListClick={onItemsListClick}
				pages={getTotalCount() <= steps ? 0 : Math.ceil(getTotalCount() / steps)}
				goToPage={goToPage}
				keyName="InventoryCD"
				displayName="InventoryCD"
				isCheckedFunc={isItemChecked}
				selectAll={selectAllItems}
				isAllSelected={isAllItemsSelected}
			/>
			<PaginatedList
				records={serials}
				isLoading={(status === InProcess)}
				active={activeSerial}
				onListClick={onSerialsListClick}
				pages={(Array.isArray(serials) && serials.length <= steps) ? 0 : Math.ceil(serials.length / steps)}
				goToPage={Function.prototype} // TODO: Support pagination
				keyName="SerialNbr"
				displayName="SerialNbr"
				isCheckedFunc={isSerialChecked}
				selectAll={selectAllSerials}
				isAllSelected={isAllSerialsSelected}
			/>
		</>
	)
}

export default ByItemsList;