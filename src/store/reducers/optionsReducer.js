import { SetShowOnlyAvailable } from "../../constants/ReduxActionTypes";
const defaultState = {
    showOnlyAvailable: false,
};
const defaultAction = { type: null, payload: null };
const filterReducer = (state = defaultState, action = defaultAction) => {
    switch (action.type) {
        case SetShowOnlyAvailable: return { showOnlyAvailable: action.payload};
        default: return state;
    }
};

export default filterReducer;