import { OrdersType } from "../constants/SelectBy";
import { NotShipped } from "../constants/OrderStatuses";
import { SetSelectedBy, SetOrderStatus, SetStartDate, SetEndDate } from "./ReduxActionTypes";
const defaultState = {
    startDate: Date.Current,
    endDate: Date.Current.DayAddedDate(31),
    selectBy: OrdersType.value,
    orderStatus: NotShipped.value
};
const defaultAction = {type: null, payload: null};
const filterReducer = (state = defaultState, action = defaultAction) => {
    switch (action.type) {
        case SetSelectedBy: return state;
        case SetOrderStatus: return state;
        case SetStartDate: return state;
        case SetEndDate: return state;
        default: return state;
    }
};

export default filterReducer;