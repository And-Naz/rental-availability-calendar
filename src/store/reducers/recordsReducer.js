import {
	SetCurrentRecords, SetSelectedRecords,
	AddOrderInSelectedRecords, RemoveOrderFromSelectedRecords,
	AddItemInSelectedRecords, RemoveItemFromSelectedRecords,
	AddSerialInSelectedRecords, RemoveSerialFromSelectedRecords
} from "../../constants/ReduxActionTypes";
const defaultState = {current: [], selected: []};
const defaultAction = { type: null, payload: null };
const recordsReducer = (state = defaultState, action = defaultAction) => {
	switch (action.type) {
		case SetCurrentRecords: return { ...state, current: action.payload };
		case SetSelectedRecords: return { ...state, selectedRecords: action.payload };
        case AddOrderInSelectedRecords:
			console.log(action);
            console.log(state);
			return state;
		case RemoveOrderFromSelectedRecords:
			console.log(action);
			return state;
		case AddItemInSelectedRecords:
			console.log(action);
			return state;
		case RemoveItemFromSelectedRecords:
			console.log(action);
			return state;
		case AddSerialInSelectedRecords:
			console.log(action);
			return state;
		case RemoveSerialFromSelectedRecords:
			console.log(action);
			return state;
		default: return state;
	}
};

export default recordsReducer;