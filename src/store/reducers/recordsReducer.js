import { OrdersType, ItemsType } from "../../constants/SelectBy"
import {
	SetCurrentRecords, SetCurrentRecordsSync, SetSelectedRecords,
	AddOrderInSelectedRecords, RemoveOrderFromSelectedRecords,
	AddItemInSelectedRecords, RemoveItemFromSelectedRecords,
	AddSerialInSelectedRecords, RemoveSerialFromSelectedRecords
} from "../../constants/ReduxActionTypes";
const defaultState = { current: [], selected: [] };
const defaultAction = { type: null, payload: null };
function recordsReducer(state = defaultState, action = defaultAction) {
	switch (action.type) {
		case SetCurrentRecords: return { selected: state.selected, current: action.payload };
		case SetCurrentRecordsSync: return { selected: state.selected, current: action.payload };
		case SetSelectedRecords: return { current: state.current, selected: action.payload };
		case AddOrderInSelectedRecords:
			return AddOrder(state, action.payload) || state;
		case RemoveOrderFromSelectedRecords:
			return RemoveOrder(state, action.payload) || state;
		case AddItemInSelectedRecords:
			return AddItem(state, action.payload.order, action.payload.selectBy, action.payload.data) || state
		case RemoveItemFromSelectedRecords:
			return RemoveItem(state, action.payload.order, action.payload.selectBy, action.payload.data) || state
		case AddSerialInSelectedRecords:
			return AddSerial(state, action.payload.order, action.payload.selectBy, action.payload.item, action.payload.data) || state;
		case RemoveSerialFromSelectedRecords:
			return RemoveSerial(state, action.payload.order, action.payload.selectBy, action.payload.item, action.payload.data) || state;
		default: return state;
	}
};

function AddOrder(state, order) {
	const orderFromCurrent = state.current.find(sc => sc.OrderNbr === order)
	if (orderFromCurrent) {
		return { current: state.current, selected: state.selected.concat({ ...orderFromCurrent }) };
	}
	return null
}

function RemoveOrder(state, order) {
	const newSelected = state.selected.filter(sc => sc.OrderNbr !== order)
	if (newSelected.length !== state.selected.length) {
		return { current: state.current, selected: newSelected };
	}
	return null
}

function AddItem(state, order, selectBy, item) {
	if (selectBy === OrdersType) {
		const selectedOrderIndex = state.selected.findIndex(ord => ord.OrderNbr === order)
		if (selectedOrderIndex === -1) {
			const newState = AddOrder(state, order)
			if (newState === null) { return state }
			const newOrder = newState.selected[newState.selected.length - 1]
			const newItem = newOrder.Lines.find(l => l.LineNbr.toString() === item)
			newOrder.Lines = [{ ...newItem }]
			newState.selected[newState.selected.length - 1] = { ...newOrder }
			return newState
		} else {
			const orderFromState = state.current.find(ord => ord.OrderNbr === order)
			if (!orderFromState) { return state }
			const selectedItemIndex = state.selected[selectedOrderIndex].Lines.findIndex(l => l.LineNbr.toString() === item.toString())
			if (selectedItemIndex === -1) {
				const newitem = orderFromState.Lines.find(l => l.LineNbr.toString() === item)
				const newSelectedState = state.selected.concat()
				newSelectedState[selectedOrderIndex].Lines.push({ ...newitem })
				return { current: state.current, selected: newSelectedState }
			}
			return null
		}
	}
	if (selectBy === ItemsType) {
		const itemFromCurrent = state.current.find(sc => sc.InventoryCD === item)
		if (itemFromCurrent) {
			return { current: state.current, selected: state.selected.concat({ ...itemFromCurrent }) };
		}
	}
	return null;
}

function RemoveItem(state, order, selectBy, item) {
	if (selectBy === OrdersType) {
		const selectedOrderIndex = state.selected.findIndex(ord => ord.OrderNbr === order)
		if (selectedOrderIndex === -1) { return null }
		if (state.selected[selectedOrderIndex].Lines.length === 1 && state.selected[selectedOrderIndex].Lines[0].LineNbr.toString() === item) {
			return RemoveOrder(state, order)
		}
		const newLines = state.selected[selectedOrderIndex].Lines.filter(l => l.LineNbr.toString() !== item)
		let newSelectedArr = [...state.selected]
		newSelectedArr[selectedOrderIndex].Lines = newLines
		return { current: state.current, selected: newSelectedArr }
	}
	if (selectBy === ItemsType) {
		const newSelected = state.selected.filter(sc => sc.InventoryCD !== item)
		if (newSelected.length !== state.selected.length) {
			return { current: state.current, selected: newSelected };
		}
	}
	return null;
}

function AddSerial(state, order, selectBy, item, serial) {
	if (selectBy === OrdersType) {
		const selectedOrderIndex = state.selected.findIndex(o => o.OrderNbr === order)
		let newState = null
		let newOrder = null
		if (selectedOrderIndex === -1) {
			newState = AddItem(state, order, selectBy, item)
			if (newState === null) { return null }
			newOrder = newState.selected[newState.selected.length - 1]
			newOrder.Lines[0].SerialsInfo = newOrder.Lines[0].SerialsInfo.filter(si => si.SerialNbr === serial)
			return newState
		} else {
			const itemIndex = state.selected[selectedOrderIndex].Lines.findIndex(l => l.LineNbr.toString() === item.toString())
			if (itemIndex === -1) {
				newState = AddItem(state, order, selectBy, item)
				if (newState === null) { return null }
				newOrder = newState.selected[newState.selected.length - 1]
				newOrder.Lines[0].SerialsInfo = newOrder.Lines[0].SerialsInfo.filter(si => si.SerialNbr === serial)
				return newState
			} else {
				newState = { current: state.current, selected: [...state.selected] }
			}
			const currentOrder = newState.current.find(o => o.OrderNbr === order)
			if (!currentOrder) { return null }
			const currentItem = currentOrder.Lines.find(l => l.LineNbr.toString() === item.toString())
			if (!currentItem) { return null }
			const newSerial = currentItem.SerialsInfo.find(si => si.SerialNbr === serial)
			if (!newSerial) { return null }
			newState.selected[selectedOrderIndex].Lines[itemIndex].SerialsInfo.push({ ...newSerial })
			return newState;
		}
	}
	if (selectBy === ItemsType) {
		const selectedItemIndex = state.selected.findIndex(i => i.InventoryCD === item)
		if (selectedItemIndex === -1) {
			const newState = AddItem(state, order, selectBy, item)
			if (newState === null) { return state }
			const newItem = newState.selected[newState.selected.length - 1]
			newItem.SerialsInfo = newItem.SerialsInfo.map(si => ({...si}))
			newState.selected[newState.selected.length - 1] = { ...newItem }
			return newState
		} else {
			const itemFromState = state.current.find(i => i.InventoryCD === item)
			if (!itemFromState) { return null }
			const newSerial = itemFromState.SerialsInfo.find(si => si.SerialNbr === serial)
			const newSelectedState = state.selected.concat()
			newSelectedState[selectedItemIndex].SerialsInfo.push({ ...newSerial })
			return { current: state.current, selected: newSelectedState }
		}
	}
	return null
}

function RemoveSerial(state, order, selectBy, item, serial) {
	if (selectBy === OrdersType) {
		const newState = { current: state.current, selected: [...state.selected] }
		const selectedOrderIndex = newState.selected.findIndex(o => o.OrderNbr === order)
		if (selectedOrderIndex === -1) { return null }
		const newOrder = {...newState.selected[selectedOrderIndex]}
		const selectedItemIndex = newState.selected[selectedOrderIndex].Lines.findIndex(l => l.LineNbr.toString() === item)
		if (selectedItemIndex === -1) { return null }
		const newLines = [...newOrder.Lines].map(l => ({...l}))
		if (newLines[selectedItemIndex].SerialsInfo.length === 1 && newLines[selectedItemIndex].SerialsInfo[0].SerialNbr === serial) {
			return RemoveItem(newState, order, selectBy, item)
		}
		const newSerialsInfo = [...newLines[selectedItemIndex].SerialsInfo].map(si => ({...si}));
		newLines[selectedItemIndex].SerialsInfo = newSerialsInfo.filter(si => si.SerialNbr !== serial)
		newOrder.Lines = newLines
		newState.selected[selectedOrderIndex] = newOrder
		return newState
	}
	if (selectBy === ItemsType) {
		const newState = { current: state.current, selected: [...state.selected] }
		const selectedItemIndex = newState.selected.findIndex(i => i.InventoryCD === item)
		if (selectedItemIndex === -1) { return null }
		if (newState.selected[selectedItemIndex].SerialsInfo.length === 1 && newState.selected[selectedItemIndex].SerialsInfo[0].SerialNbr === serial) {
			return RemoveItem(newState, order, selectBy, item)
		}
		const newSerialsInfo = newState.selected[selectedItemIndex].SerialsInfo.map(si => ({...si}));
		newState.selected[selectedItemIndex].SerialsInfo = newSerialsInfo.filter(si => si.SerialNbr !== serial)
		return newState
	}
	return null
}

export default recordsReducer;