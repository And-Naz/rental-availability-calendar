import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import filter from "./reducers/filterReducer";
import records from "./reducers/recordsReducer";
import selectedRecords from "./reducers/selectedRecordsReducer";
const rootReducer = combineReducers({
    filter, records, selectedRecords
})
const store = createStore(rootReducer, applyMiddleware(thunk))
export default store