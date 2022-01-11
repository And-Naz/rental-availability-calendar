import * as Types from "./ReduxActionTypes"
class ReduxActionModel {
    constructor(type, payload) {
        if(type !== null && !Object.keys(Types).find(key => Types[key] === type)) {throw new Error("Invalid Action Type!")}
        this.type = type;
        this.payload = payload
    }
}
export default ReduxActionModel;