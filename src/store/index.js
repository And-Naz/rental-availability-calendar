import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import filter from "./filterReducer";
import records from "./recordsReducer";
import selectedRecords from "./selectedRecordsReducer";
const rootReducer = combineReducers({
    filter, records, selectedRecords
})
const store = createStore(rootReducer, applyMiddleware(thunk))
export default store