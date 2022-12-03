import { OrdersType } from "../../constants/SelectBy";
import { NotShipped } from "../../constants/OrderStatuses";
import { SetSelectedBy, SetOrderStatus, SetStartDate, SetEndDate, SetFilterByContent, SetCalendarType, SetFilter } from "../../constants/ReduxActionTypes";
import { FILTER_DATE_TYPE } from "../../constants/FilterDateType";
const defaultState = {
    startDate: Date.$Current,
    endDate: Date.$Current.$dayAddedDate(31),
    selectBy: OrdersType.value,
    orderStatus: NotShipped.value,
    calendarType: FILTER_DATE_TYPE.WEEK,
    filterByContent: "",
    isProcessButtonDisable: false
};
const defaultAction = {type: null, payload: null};
const filterReducer = (state = defaultState, action = defaultAction) => {
    switch (action.type) {
        case SetSelectedBy: return {...state, selectBy: action.payload};
        case SetOrderStatus: return {...state, orderStatus: action.payload};
        case SetStartDate: {
            const newState_start = {...state, startDate: action.payload}
            newState_start.isProcessButtonDisable = false
            try {
                const difDays_startChanged = Date.$GetDateDifferenceByDay(newState_start.startDate, newState_start.endDate)
                if (difDays_startChanged > 366) {
                    newState_start.isProcessButtonDisable = true
                    alert("Start Date can't be less than 1 year from End Date")
                }
            } catch (error) {
                newState_start.isProcessButtonDisable = true
                console.error(error.message)
                alert("Invalid Start Date.")
            }
            return newState_start
        };
        case SetEndDate: {
            const newState_end = {...state, endDate: action.payload};
            newState_end.isProcessButtonDisable = false
            try {
                const difDays_endChanged = Date.$GetDateDifferenceByDay(newState_end.startDate, newState_end.endDate)
                if (difDays_endChanged > 366) {
                    newState_end.isProcessButtonDisable = true
                    alert("End Date can't be more than 1 year from Start Date")
                }
            } catch (error) {
                newState_end.isProcessButtonDisable = true
                console.error(error.message)
                alert("Invalid End Date.")
            }
            return newState_end
        };
        case SetCalendarType: return {...state, calendarType: action.payload };
        case SetFilterByContent: return {...state, filterByContent: action.payload};
        case SetFilter: {
            if (!action.payload) {
                return {...defaultState}
            }
            return {...action.payload}
        }
        default: return state;
    }
};

export default filterReducer;