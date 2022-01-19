import ReduxActionModel from "../models/ReduxActionModel"
export function Synchronous(type) {
	return (value) => ReduxActionModel(type, value)
}
export function Asynchronous(type) {
	return (param) => (dispatch) => {
		let promise = null
		if (param instanceof Promise) {
			promise = param
		} else {
			promise = Promise.resolve(param)
		}
		promise.then(value => dispatch(ReduxActionModel(type, value)))
	}
}