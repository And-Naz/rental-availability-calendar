import * as Types from "../constants/ReduxActionTypes";
import {Synchronous, Asynchronous} from "../helpers/ReduxActionsGenerator"
export const actionSetSelectBy           = Synchronous(Types.SetSelectedBy)
export const actionSetOrderStatus        = Synchronous(Types.SetOrderStatus)
export const actionSetStartDate          = Synchronous(Types.SetStartDate)
export const actionSetEndDate            = Synchronous(Types.SetEndDate)
export const actionSetRecords            = Asynchronous(Types.SetRecords)
export const actionSetSelectedRecords    = Asynchronous(Types.SetSelectedBy)