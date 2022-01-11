import * as Types from "../constants/ReduxActionTypes";
import {Synchronous, Asynchronous} from "./ReduxActionsGenerator"
export const setSelectBy = Synchronous(Types.SetSelectedBy)
export const setOrderStatus = Synchronous(Types.SetOrderStatus)
export const setStartDate = Synchronous(Types.SetStartDate)
export const setEndDate = Synchronous(Types.SetEndDate)
export const setRecords = Asynchronous(Types.SetRecords)
export const setSelectedRecords = Asynchronous(Types.SetSelectedBy)