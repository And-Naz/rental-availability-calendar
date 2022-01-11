import { SetSelectedRecords } from "./ReduxActionTypes";
const defaultState = new Map();
const defaultAction = {type: null, payload: null};
const selectedRecordsReducer = (state = defaultState, action = defaultAction) => {
    switch (action.type) {
        case SetSelectedRecords: return state;
        default: return state;
    }
};

export default selectedRecordsReducer;