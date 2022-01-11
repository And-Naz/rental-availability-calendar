import * as Types from "../constants/ReduxActionTypes"
function ReduxActionModel (type, payload) {
    if(type !== null && !Object.keys(Types).find(key => Types[key] === type)) {throw new Error("Invalid Redux Action Type!")}
    return {type, payload}
}

export default ReduxActionModel;