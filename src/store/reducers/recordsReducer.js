import {OrdersType, ItemsType} from "../../constants/SelectBy"
import {
	SetCurrentRecords, SetSelectedRecords,
	AddOrderInSelectedRecords, RemoveOrderFromSelectedRecords,
	AddItemInSelectedRecords, RemoveItemFromSelectedRecords,
	AddSerialInSelectedRecords, RemoveSerialFromSelectedRecords
} from "../../constants/ReduxActionTypes";
const defaultState = {current: [], selected: []};
const defaultAction = { type: null, payload: null };
function recordsReducer(state = defaultState, action = defaultAction) {
	switch (action.type) {
		case SetCurrentRecords: return { selected: state.selected, current: action.payload };
		case SetSelectedRecords: return { current: state.current, selected: action.payload };
        case AddOrderInSelectedRecords:
            const orderFromCurrent = state.current.find(sc => sc.OrderNbr === action.payload)
			if(orderFromCurrent) {
				return {current: state.current, selected: state.selected.concat({...orderFromCurrent})};
			}
			return state;
		case RemoveOrderFromSelectedRecords:
			const newSelected = state.selected.filter(sc => sc.OrderNbr !== action.payload)
			if(newSelected.length !== state.selected.length) {
				return {current: state.current, selected: newSelected};
			}
			return state;
		case AddItemInSelectedRecords:
			if(action.payload.selectBy === OrdersType) {
				const currentOrder = state.current.find(ord => ord.OrderNbr === action.payload.order)
				if (!currentOrder) { return state }
				const line = currentOrder.Lines.find(l => l.LineNbr.toString() === action.payload.data)
				if(!line) {return state}
				let selectedOrderIndex = state.selected.findIndex(ord => ord.OrderNbr === action.payload.order)
				let newSelectedArr = null
				if(selectedOrderIndex === -1) {
					let newSelectedOrder = {...currentOrder}
					newSelectedOrder.Lines = [{...line}]
					newSelectedArr = state.selected.concat(newSelectedOrder)
				} else {
					newSelectedArr = state.selected.concat()
					newSelectedArr[selectedOrderIndex].Lines.push({...line})
				}
				return {current: state.current, selected: newSelectedArr}
			}
			if(action.payload.selectBy === ItemsType) {
				// Comming Soon
			}
			return state;
		case RemoveItemFromSelectedRecords:
			if(action.payload.selectBy === OrdersType) {
				const currentOrderIndex = state.selected.findIndex(ord => ord.OrderNbr === action.payload.order)
				if(currentOrderIndex === -1) {return state}
				const newLines = state.selected[currentOrderIndex].Lines.filter(l => l.LineNbr.toString() !== action.payload.data)
				let newSelectedArr = [...state.selected]
				if(!newLines.length) {
					newSelectedArr = newSelectedArr.$removeByIndex(currentOrderIndex)
				} else {
					newSelectedArr[currentOrderIndex].Lines = newLines
				}
				return {current: state.current, selected: newSelectedArr}
			}
			if(action.payload.selectBy === ItemsType) {
				// Comming Soon
			}
			return state;
		case AddSerialInSelectedRecords:
			debugger
			console.log(action);
			if(action.payload.selectBy === OrdersType) {
				const currentOrderIndex = state.selected.findIndex(ord => ord.OrderNbr === action.payload.order)
				if(currentOrderIndex === -1) {

				} else {
					const currentItemIndex = state.selected[currentOrderIndex].Lines.findIndex(l => l.LineNbr.toString() !== action.payload.item)
				}

			}
			if(action.payload.selectBy === ItemsType) {
				// Comming Soon
			}
			return state;
		case RemoveSerialFromSelectedRecords:
			console.log(action);
			return state;
		default: return state;
	}
};

export default recordsReducer;