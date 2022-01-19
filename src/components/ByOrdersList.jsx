import useRequestApi from '../hooks/useRequestApi';
import { useState, useCallback, useEffect } from 'react';
import PaginatedList from "./uiKits/PaginatedList"
import { InProcess } from "../constants/StatusesOfRequest"
import { useDispatch } from "react-redux"
import useUpdateEffect from "../hooks/useUpdateEffect"
import useIsRecordSelected from "../hooks/useIsRecordSelected"
import useFindAndMutateFromArray from '../hooks/useFindAndMutateFromArray';
import { OrdersType } from "../constants/SelectBy"
import {
	actionAddOrderInSelectedRecords, actionRemoveOrderFromSelectedRecords,
	actionAddItemInSelectedRecords, actionRemoveItemFromSelectedRecords,
	actionAddSerialInSelectedRecords, actionRemoveSerialFromSelectedRecords
} from "../store/ReduxActions";
function ByOrdersList(props) {
	const dispatch = useDispatch()
	const steps = 50;
	const [chuncks, setChuncks] = useState([0, 49])
	const goToPage = useCallback(page => setChuncks([steps * page, (steps * (page + 1)) - 1]), [])
	const { records, status, errorStack, getTotalCount, load } = useRequestApi(chuncks)
	const [activeOrder, setActiveOrder] = useState(null)
	const [activeItem, setActiveItem] = useState(null)
	const [activeSerial, setActiveSerial] = useState(null)
	useUpdateEffect(() => { load(chuncks) }, [chuncks])
	const lines = useFindAndMutateFromArray(records, d => (d.OrderNbr === activeOrder), d => { return d ? d.Lines : [] }, [records, activeOrder])
	const serials = useFindAndMutateFromArray(lines, d => (d.LineNbr.toString() === activeItem && d.IsSerial), d => { return d ? d.SerialsInfo : [] }, [lines, activeItem])
	const { checkOrder, checkItem, checkSerial } = useIsRecordSelected()
	const onOrdersListClick = useCallback(e => {
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
		setActiveOrder(rec)
		if (checkInState && value !== null) {
			if (value) {
				dispatch(actionAddOrderInSelectedRecords(rec))
			} else {
				dispatch(actionRemoveOrderFromSelectedRecords(rec))
			}
		}
	}, [records])
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
				dispatch(actionAddItemInSelectedRecords({ selectBy: OrdersType, data: rec, order: activeOrder }))
			} else {
				dispatch(actionRemoveItemFromSelectedRecords({ selectBy: OrdersType, data: rec, order: activeOrder }))
			}
		}
	}, [activeOrder])
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
				dispatch(actionAddSerialInSelectedRecords({ selectBy: OrdersType, data: rec, order: activeOrder, item: activeItem }))
			} else {
				dispatch(actionRemoveSerialFromSelectedRecords({ selectBy: OrdersType, data: rec, order: activeOrder, item: activeItem }))
			}
		}
	}, [activeOrder, activeItem])
	const isOrderChecked = useCallback((order) => checkOrder(order), [checkOrder])
	const isItemChecked = useCallback((item) => checkItem(item, activeOrder), [checkItem, activeOrder])
	const isSerialChecked = useCallback((serial) => checkSerial(serial, activeItem, activeOrder), [checkSerial, activeOrder, activeItem])
	return (
		<>
			<PaginatedList
				records={records}
				isLoading={(status === InProcess)}
				active={activeOrder}
				onListClick={onOrdersListClick}
				pages={getTotalCount() <= steps ? 0 : Math.ceil(getTotalCount() / steps)}
				goToPage={goToPage}
				keyName="OrderNbr"
				displayName="OrderNbr"
				isCheckedFunc={isOrderChecked}
			/>
			<PaginatedList
				records={lines}
				isLoading={(status === InProcess)}
				active={activeItem}
				onListClick={onItemsListClick}
				pages={(Array.isArray(lines) && lines.length <= steps) ? 0 : Math.ceil(lines.length / steps)}
				goToPage={Function.prototype}
				keyName="LineNbr"
				displayName="InventoryCD"
				isCheckedFunc={isItemChecked}
			/>
			<PaginatedList
				records={serials}
				isLoading={(status === InProcess)}
				active={activeSerial}
				onListClick={onSerialsListClick}
				pages={(Array.isArray(serials) && serials.length <= steps) ? 0 : Math.ceil(serials.length / steps)}
				goToPage={Function.prototype}
				keyName="SerialNbr"
				displayName="SerialNbr"
				isCheckedFunc={isSerialChecked}
			/>
		</>
	)
}

export default ByOrdersList;