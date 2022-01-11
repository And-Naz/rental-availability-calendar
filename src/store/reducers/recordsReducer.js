import { SetRecords } from "../../constants/ReduxActionTypes";
const defaultState = new Map();
const defaultAction = {type: null, payload: null};
const recordsReducer = (state = defaultState, action = defaultAction) => {
    switch (action.type) {
        case SetRecords: return state;
        default: return state;
    }
};

export default recordsReducer;