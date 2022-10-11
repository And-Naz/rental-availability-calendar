import * as Types from "../constants/ReduxActionTypes";
import { Synchronous, Asynchronous } from "../helpers/ReduxActionsGenerator"

export const actionSetSelectBy = Synchronous(Types.SetSelectedBy);
export const actionSetOrderStatus = Synchronous(Types.SetOrderStatus);
export const actionSetStartDate = Synchronous(Types.SetStartDate);
export const actionSetEndDate = Synchronous(Types.SetEndDate);
export const actionSetCalendarType = Synchronous(Types.SetCalendarType);
export const actionSetFilterByContent = Synchronous(Types.SetFilterByContent);
export const actionSetFilter = Synchronous(Types.SetFilter);

export const actionSetSelectedRecords = Synchronous(Types.SetSelectedRecords);
export const actionAddOrderInSelectedRecords = Synchronous(Types.AddOrderInSelectedRecords);
export const actionRemoveOrderFromSelectedRecords = Synchronous(Types.RemoveOrderFromSelectedRecords);
export const actionAddItemInSelectedRecords = Synchronous(Types.AddItemInSelectedRecords);
export const actionRemoveItemFromSelectedRecords = Synchronous(Types.RemoveItemFromSelectedRecords);
export const actionAddSerialInSelectedRecords = Synchronous(Types.AddSerialInSelectedRecords);
export const actionRemoveSerialFromSelectedRecords = Synchronous(Types.RemoveSerialFromSelectedRecords);
export const actionSetShowOnlyAvailable = Synchronous(Types.SetShowOnlyAvailable);

export const actionSetCurrentRecords = Asynchronous(Types.SetCurrentRecords);
export const actionSetCurrentRecordsSync = Synchronous(Types.SetCurrentRecordsSync);