import { useCallback } from "react";
import { useSelector } from "react-redux"
import { OrdersType, ItemsType } from "../constants/SelectBy"
const getSelected = state => state.records.selected;
const getSelectBy = state => state.filter.selectBy;
function useIsRecordSelected() {
	const selectBy = useSelector(getSelectBy)
	const selected = useSelector(getSelected)
	const checkOrder = useCallback((order) => {
		if (selectBy === OrdersType.value) {
			return -1 < selected.findIndex(s => s.OrderNbr === order)
		}
		return false
	}, [selectBy, selected])
	const checkItem = useCallback((item, order) => {
		if (selectBy === OrdersType.value) {
			const index = selected.findIndex(s => s.OrderNbr === order)
			if (index === -1) { return false }
			return -1 < selected[index].Lines.findIndex(l => l.LineNbr.toString() === item.toString())
		}
		if (selectBy === ItemsType.value) {
			return -1 < selected.findIndex(l => l.InventoryCD === item)
		}
		return false
	}, [selectBy, selected])
	const checkSerial = useCallback((serial, item, order) => {
		if (selectBy === OrdersType.value) {
			const orderIndex = selected.findIndex(s => s.OrderNbr === order)
			if (orderIndex === -1) { return false }
			const itemIndex = selected[orderIndex].Lines.findIndex(l => l.LineNbr.toString() === item.toString() && l.IsSerial)
			if (itemIndex === -1) { return false }
			return -1 < selected[orderIndex].Lines[itemIndex].SerialsInfo.findIndex(si => si.SerialNbr === serial)
		}
		if (selectBy === ItemsType.value) {
			const itemIndex = selected.findIndex(l => l.InventoryCD === item && l.IsSerial)
			if (itemIndex === -1) { return false }
			return -1 < selected[itemIndex].SerialsInfo.findIndex(si => si.SerialNbr === serial)
		}
		return false
	}, [selectBy, selected])
	return { checkOrder, checkItem, checkSerial }
}
export default useIsRecordSelected
