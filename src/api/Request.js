import * as SelectBy from "../constants/SelectBy";
import * as OrderStatuses from "../constants/OrderStatuses";
import * as ErrorsOfRequest from "../constants/ErrorsOfRequest";
import * as StatusesOfRequest from "../constants/StatusesOfRequest";
const errorsOfRequest = Object.keys(ErrorsOfRequest).reduce((acc, key) => {acc[key] = ErrorsOfRequest[key]; return acc}, {});
const statusesOfRequest = Object.keys(StatusesOfRequest).reduce((acc, key) => {acc[key] = StatusesOfRequest[key]; return acc}, {});
class Request {
	static Errors = errorsOfRequest
	static Statuses = statusesOfRequest
	static CheckingMiddleweare = function (...callbacks) {
		return callbacks.reduce((acc, cb, index, arr) => {
			const retVal = cb(acc, index, arr)
			if (!retVal) {
				acc.push(index)
			}
			return acc
		}, []);
	}
	#validate = (callbacks, errors) => {
		const indexesOfErrors = Request.CheckingMiddleweare(...callbacks);
		if (Array.isArray(indexesOfErrors) && indexesOfErrors.length) {
			const errors = indexesOfErrors.map(index => errors[index])
				.filter(er => !errors.includes(er));
			this.#errorsStack = this.#errorsStack.concat(errors);
			return false
		} else {
			this.#errorsStack = this.#errorsStack.filter(es => !errors.includes(es));
			return true
		}
	}
	#validateSelectedBy = (value) => () => {	
		if (!Object.keys(SelectBy).find(key => SelectBy[key] === value)) {
			return false
		}
		return true;
	};
	#validateOrderStatus = (value) => () => {
		if (!Object.keys(OrderStatuses).find(key => OrderStatuses[key] === value)) {
			return false
		}	
		return true;
	};
	#validateStartDate = (value) => () => {
		if (!(value instanceof Date) || value > this.EndDate) {
			return false
		}
		return true
	};
	#validateEndDate = (value) => () => {
		if (!(value instanceof Date) || value < this.StartDate) {
			return false
		}
		return true
	};
	#validateSteps = (value) => () => {
		if (typeof value !== "number" || Number.isNaN(value)) {
			return false
		}
		return true
	};
	#validateAll = () => {
		this.#validate(
			[
				this.#validateSelectedBy(this.SelectBy),
				this.#validateOrderStatus(this.OrderStatus),
				this.#validateStartDate(this.StartDate),
				this.#validateEndDate(this.EndDate),
				this.#validateSteps(this.Steps),
			],
			[
				Request.Errors.InvalidSelectBy,
				Request.Errors.InvalidOrderStatus,
				Request.Errors.InvalidStartDate,
				Request.Errors.InvalidEndDate,
				Request.Errors.InvalidSteps,
			]
		);
		return this.isValid;
	}
	#takeCacheInfo = (start, end) => {
		let requestStart = start;
		let requestEnd = end;
		let inCacheExistsChunck = false;
		let inCacheExistsAll = false
		let cacheStart = start;
		let cacheEnd = end;
		let needDoRequest = true
		if (end <= this.#lastLoadEnd) {
			inCacheExistsAll = true;
			needDoRequest = false;
		}
		if (!inCacheExistsAll && start <= this.#lastLoadEnd && end > this.#lastLoadEnd) {
			inCacheExistsChunck = true;
			cacheEnd = this.#lastLoadEnd;
			requestStart = this.#lastLoadEnd + 1;
			requestEnd = end;
			if (requestStart > requestEnd) { throw Request.Errors.InvalidDataPosition } /* TODO: test this part */
		}
		return { requestStart, requestEnd, inCacheExistsChunck, inCacheExistsAll, cacheStart, cacheEnd, needDoRequest }
	}
	#errorsStack = [];
	#status = Request.Statuses.Empty;
	#api = null;
	#records = new Map();
	#selectBy = SelectBy.OrdersType;
	#orderStatus = OrderStatuses.NotShipped;
	#lastLoadStart = null;
	#lastLoadEnd = null;
	#startDate = Date.Current;
	#endDate = Date.Current.DayAddedDate(31);
	get Status() { return this.#status; };
	get ErrorsStack() { return [...this.#errorsStack] }
	get isValid() { return this.ErrorsStack.length === 0 }
	get Records() { return [...this.#records.values()] }
	get SelectBy() { return this.#selectBy; };
	set SelectBy(value) {
		this.#validate([this.#validateSelectedBy(value)], [Request.Errors.InvalidSelectBy])
		this.#selectBy = value;
		this.clean()
	};
	get OrderStatus() { return this.#orderStatus; };
	set OrderStatus(value) {
		this.#validate([this.#validateOrderStatus(value)], [Request.Errors.InvalidOrderStatus])
		this.#orderStatus = value;
		this.clean()
	};
	get StartDate() { return this.#startDate; };
	set StartDate(value) {
		this.#validate([this.#validateStartDate(value)], [Request.Errors.InvalidStartDate])
		this.#startDate = value;
		this.clean()
	};
	get EndDate() { return this.#endDate; };
	set EndDate(value) {
		this.#validate([this.#validateEndDate(value)], [Request.Errors.InvalidEndDate])
		this.#startDate = value;
		this.clean()
	};
	get Steps() { return this.#api.steps; };
	set Steps(value) {
		this.#validate([this.#validateSteps(value)], [Request.Errors.InvalidSteps])
		this.#api.steps = value;
	};
	get InitStart() { return this.#api.initStart }
	get InitEnd() { return this.#api.initEnd }
	constructor(api) {
		this.#api = api;
	};
	clean() {
		this.#records = new Map();
		this.#lastLoadStart = null;
		this.#lastLoadEnd = null;
		this.#status = Request.Statuses.Empty;
	}
	Update({ selectBy, orderStatus, startDate, endDate, steps }) {
		selectBy && (this.SelectBy = selectBy);
		orderStatus && (this.OrderStatus = orderStatus);
		startDate && (this.StartDate = startDate);
		endDate && (this.EndDate = endDate);
		steps && (this.Steps = steps);
	}
	RecordsTotalCount = async () => {
		this.#status = Request.Statuses.InProcess;
		if (!this.#validateAll()) {
			this.#status = Request.Statuses.Rest;
			throw new Error(this.ErrorsStack.join(" "))
		}
		const data = await this.#api.recordsTotalCount(this.SelectBy, this.OrderStatus, this.StartDate, this.EndDate)
		this.#status = Request.Statuses.Rest;
		return data
	}
	Load = async (
		start = (!this.#lastLoadStart) ? this.#api.initStart : this.#lastLoadStart + this.#api.steps,
		end = (!this.#lastLoadEnd) ? this.#api.initEnd : this.#lastLoadEnd + this.#api.steps
	) => {
		this.#status = Request.Statuses.InProcess;
		if (!this.#validateAll()) {
			this.#status = Request.Statuses.Rest;
			throw new Error(this.ErrorsStack.join(" "))
		}
		let newData = [];
		const cacheInfo = this.#takeCacheInfo(start, end)
		if (cacheInfo.inCacheExistsChunck) {
			newData = newData.concat(this.Records.slice(cacheInfo.cacheStart, cacheInfo.cacheEnd))
		}
		if (cacheInfo.needDoRequest) {
			let requestData = await this.#api.loadRecords(this.SelectBy, this.OrderStatus, this.StartDate, this.EndDate, cacheInfo.requestStart, cacheInfo.requestEnd);
			newData = newData.concat(requestData)
		}
		if (!cacheInfo.inCacheExistsAll && Array.isArray(newData) && !newData.length) {
			const totalCount = await this.#api.recordsTotalCount(this.SelectBy, this.OrderStatus, this.StartDate, this.EndDate)
			if (totalCount === this.#lastLoadEnd + 1) {
				this.#status = Request.Statuses.Error;
				throw Request.Errors.InvalidServerResponding;
			}
			this.#status = Request.Statuses.Finished;
			return false
		}
		if (!cacheInfo.inCacheExistsAll) {
			let key = null;
			for (let i = 0; i < newData.length; i++) {
				key = this.SelectBy === SelectBy.OrdersType ? newData[i].OrderNbr : newData[i].InventoryCD
				if (!this.#records.has(key)) {
					this.#records.set(key, newData[i]);
				}
			}
		}
		this.#lastLoadStart = start;
		this.#lastLoadEnd = end;
		this.#status = Request.Statuses.Rest;
		return cacheInfo.inCacheExistsAll ? true : newData.length > 0;
	}
};
export default Request;