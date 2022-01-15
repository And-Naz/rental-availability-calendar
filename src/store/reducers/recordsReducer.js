import { SetRecords } from "../../constants/ReduxActionTypes";
const defaultState = [];
const defaultAction = { type: null, payload: null };
const recordsReducer = (state = defaultState, action = defaultAction) => {
	switch (action.type) {
		case SetRecords: return { ...state, records: action.payload };
		default: return state;
	}
};

export default recordsReducer;