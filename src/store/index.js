import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import filter from "./reducers/filterReducer";
import records from "./reducers/recordsReducer";
import options from "./reducers/optionsReducer"
import { composeWithDevTools } from "redux-devtools-extension";
const rootReducer = combineReducers({
	filter, records, options
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store