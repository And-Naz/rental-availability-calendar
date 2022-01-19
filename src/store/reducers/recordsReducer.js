import { OrdersType, ItemsType } from "../../constants/SelectBy"
import {
	SetCurrentRecords, SetSelectedRecords,
	AddOrderInSelectedRecords, RemoveOrderFromSelectedRecords,
	AddItemInSelectedRecords, RemoveItemFromSelectedRecords,
	AddSerialInSelectedRecords, RemoveSerialFromSelectedRecords
} from "../../constants/ReduxActionTypes";
const defaultState = { current: [], selected: [] };
const defaultAction = { type: null, payload: null };
function recordsReducer(state = defaultState, action = defaultAction) {
	switch (action.type) {
		case SetCurrentRecords: return { selected: state.selected, current: action.payload };
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

export default recordsReducer;

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
		let selectedOrderIndex = state.selected.findIndex(ord => ord.OrderNbr === order)
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
			const newitem = orderFromState.Lines.find(l => l.LineNbr.toString() === item)
			const newSelectedState = state.selected.concat()
			newSelectedState[selectedOrderIndex].Lines.push({ ...newitem })
			return { current: state.current, selected: newSelectedState }
		}
	}
	if (selectBy === ItemsType) {
		// Comming Soon
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
		// Comming Soon
	}
	return null;
}

function AddSerial(state, order, selectBy, item, serial) {
	if (selectBy === OrdersType) {
		const selectedOrderIndex = state.selected.findIndex(o => o.OrderNbr === order)
		if (selectedOrderIndex === -1) {
			const newState = AddItem(state, order, selectBy, item)
			if (newState === null) { return null }
			const newOrder = newState.selected[newState.selected.length - 1]
			newOrder.Lines[0].SerialsInfo = newOrder.Lines[0].SerialsInfo.filter(si => si.SerialNbr === serial)
			return newState
		}
	}
	if (selectBy === ItemsType) {
		// Comming Soon
	}
	return null
}

function RemoveSerial(state, order, selectBy, item, serial) {
	if (selectBy === OrdersType) {
		const selectedOrderIndex = state.selected.findIndex(o => o.OrderNbr === order)
		if (selectedOrderIndex === -1) { return null }
		const selectedItemIndex = state.selected[selectedOrderIndex].Lines.findIndex(l => l.LineNbr.toString() === item)
		if (selectedItemIndex === -1) { return null }
		if (state.selected[selectedOrderIndex].Lines[selectedItemIndex].SerialsInfo.length === 1 && state.selected[selectedOrderIndex].Lines[selectedItemIndex].SerialsInfo[0].SerialNbr === serial) {
			return RemoveItem(state, order, selectBy, item)
		}
		const newSerials = state.selected[selectedOrderIndex].Lines[selectedItemIndex].SerialsInfo.filter(si => si.SerialNbr !== serial)
		const newState = { current: state.current, selected: [...state.selected] }
		newState.selected[selectedOrderIndex].Lines[selectedItemIndex].SerialsInfo = newSerials
		return newState
	}
	if (selectBy === ItemsType) {
		// Comming Soon
	}
	return null
}