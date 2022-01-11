import { OrdersType } from "../../constants/SelectBy";
import { NotShipped } from "../../constants/OrderStatuses";
import { SetSelectedBy, SetOrderStatus, SetStartDate, SetEndDate } from "../../constants/ReduxActionTypes";
const defaultState = {
    startDate: Date.Current,
    endDate: Date.Current.DayAddedDate(31),
    selectBy: OrdersType.value,
    orderStatus: NotShipped.value
};
const defaultAction = {type: null, payload: null};
const filterReducer = (state = defaultState, action = defaultAction) => {
    switch (action.type) {
        case SetSelectedBy: return {...state, selectBy: action.payload};
        case SetOrderStatus: return {...state, orderStatus: action.payload};
        case SetStartDate: return {...state, startDate: action.payload};
        case SetEndDate: return {...state, endDate: action.payload};
        default: return state;
    }
};

export default filterReducer;