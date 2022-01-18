import * as Types from "../constants/ReduxActionTypes";
import { Synchronous, Asynchronous } from "../helpers/ReduxActionsGenerator"
export const actionSetSelectBy = Synchronous(Types.SetSelectedBy);
export const actionSetOrderStatus = Synchronous(Types.SetOrderStatus);
export const actionSetStartDate = Synchronous(Types.SetStartDate);
export const actionSetEndDate = Synchronous(Types.SetEndDate);
export const actionSetFilterByContent = Synchronous(Types.SetFilterByContent);
export const actionSetCurrentRecords = Asynchronous(Types.SetCurrentRecords);
export const actionSetSelectedRecords = Asynchronous(Types.SetSelectedRecords);
export const actionAddOrderInSelectedRecords = Asynchronous(Types.AddOrderInSelectedRecords);
export const actionRemoveOrderFromSelectedRecords = Asynchronous(Types.RemoveOrderFromSelectedRecords);
export const actionAddItemInSelectedRecords = Asynchronous(Types.AddItemInSelectedRecords);
export const actionRemoveItemFromSelectedRecords = Asynchronous(Types.RemoveItemFromSelectedRecords);
export const actionAddSerialInSelectedRecords = Asynchronous(Types.AddSerialInSelectedRecords);
export const actionRemoveSerialFromSelectedRecords = Asynchronous(Types.RemoveSerialFromSelectedRecords);