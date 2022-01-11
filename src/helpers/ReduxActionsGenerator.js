import ReduxActionModel from "../models/ReduxActionModel"
export function Synchronous(type) {
    return (value) => new ReduxActionModel(type, value)
}
export function Asynchronous(type) {
    return (promise) => (dispatch) => {
        promise.then(value => dispatch(new ReduxActionModel(type, value)))
    }
}