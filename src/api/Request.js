import * as SelectBy from "../constants/SelectBy";
import * as OrderStatuses from "../constants/OrderStatuses";
import * as ErrorsOfRequest from "../constants/ErrorsOfRequest";
import * as StatusesOfRequest from "../constants/StatusesOfRequest";
const errorsOfRequest = Object.keys(ErrorsOfRequest).reduce((acc, key) => { acc[key] = ErrorsOfRequest[key]; return acc }, {});
const statusesOfRequest = Object.keys(StatusesOfRequest).reduce((acc, key) => { acc[key] = StatusesOfRequest[key]; return acc }, {});
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
		/* clean already same errors from stack */
		this.#errorsStack.filter(er => !errors.includes(er));
		if (Array.isArray(indexesOfErrors) && indexesOfErrors.length) {
			const _errors = indexesOfErrors.map(index => errors[index])
			this.#errorsStack = this.#errorsStack.concat(_errors);
			return false
		}
		return true
	}
	#validateSelectedBy = (value) => () => {
		if (value === this.SelectBy) return true;
		if (!Object.keys(SelectBy).find(key => SelectBy[key].value === value)) {
			return false
		}
		return true;
	};
	#validateOrderStatus = (value) => () => {
		if (value === this.OrderStatus) return true;
		if (!Object.keys(OrderStatuses).find(key => OrderStatuses[key].value === value)) {
			return false
		}
		return true;
	};
	#validateStartDate = (value) => () => {
		if (value === this.StartDate) return true;
		if (!(value instanceof Date) || value > this.EndDate) {
			return false
		}
		return true
	};
	#validateEndDate = (value) => () => {
		if (value === this.EndDate) return true;
		if (!(value instanceof Date) || value < this.StartDate) {
			return false
		}
		return true
	};
	#validateFilterByContent = (value) => () => {
		if (value === this.FilterByContent) return true;
		if (!(typeof value === "string" || value instanceof String)) {
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
				this.#validateFilterByContent(this.FilterByContent),
			],
			[
				Request.Errors.InvalidSelectBy,
				Request.Errors.InvalidOrderStatus,
				Request.Errors.InvalidStartDate,
				Request.Errors.InvalidEndDate,
				Request.Errors.InvalidFilterByContent,
			]
		);
		return this.isValid;
	}
	#createCacheKey = () => {
		const _filter = { ...this.Filter };
		_filter.startDate = _filter.startDate.$formatDate("YYYY-MM-DD")
		_filter.endDate = _filter.endDate.$formatDate("YYYY-MM-DD")
		delete _filter.filterByContent
		const key = Object.keys(_filter).reduce((acc, key) => {
			return acc += `${key}:${_filter[key]}|`
		}, "").slice(0, -1)
		return key
	}
	#errorsStack = [];
	#status = Request.Statuses.Empty;
	#apiInterface = null;
	#totalCount = 0
	#selectBy = SelectBy.OrdersType.value;
	#orderStatus = OrderStatuses.NotShipped.value;
	#startDate = Date.$Current;
	#endDate = Date.$Current.$dayAddedDate(31);
	#filterByContent = "";
	get helpers() {
		return this.#apiInterface['helpers']
	}
	get Filter() {
		return {
			selectBy: this.SelectBy,
			orderStatus: this.OrderStatus,
			startDate: new Date(this.StartDate.toISOString()),
			endDate: new Date(this.EndDate.toISOString()),
			filterByContent: this.FilterByContent
		}
	}
	get Status() { return this.#status; };
	get ErrorsStack() { return [...this.#errorsStack] }
	get isValid() { return this.ErrorsStack.length === 0 }
	get TotalCount() { return this.#totalCount }
	get SelectBy() { return this.#selectBy; };
	set SelectBy(value) {
		this.#validate([this.#validateSelectedBy(value)], [Request.Errors.InvalidSelectBy])
		this.#selectBy = value;
	};
	get OrderStatus() { return this.#orderStatus; };
	set OrderStatus(value) {
		this.#validate([this.#validateOrderStatus(value)], [Request.Errors.InvalidOrderStatus])
		this.#orderStatus = value;
	};
	get StartDate() { return this.#startDate; };
	set StartDate(value) {
		this.#validate([this.#validateStartDate(value)], [Request.Errors.InvalidStartDate])
		this.#startDate = value;
	};
	get EndDate() { return this.#endDate; };
	set EndDate(value) {
		this.#validate([this.#validateEndDate(value)], [Request.Errors.InvalidEndDate])
		this.#startDate = value;
	};
	get FilterByContent() { return this.#filterByContent }
	set FilterByContent(value) {
		this.#validate([this.#validateFilterByContent(value)], [Request.Errors.InvalidFilterByContent])
		this.#filterByContent = value;
	}

	constructor(apiInterface, filter = {}) {
		this.#apiInterface = apiInterface;
		if (Object.getPrototypeOf(filter) === Object.prototype) {
			if ("selectBy" in filter) { this.SelectBy = filter.selectBy }
			if ("orderStatus" in filter) { this.OrderStatus = filter.orderStatus }
			if ("startDate" in filter) { this.StartDate = filter.startDate }
			if ("endDate" in filter) { this.EndDate = filter.endDate }
			if ("filterByContent" in filter) { this.FilterByContent = filter.filterByContent }
		}
	};
	clean() {
		this.#status = Request.Statuses.Empty;
	}
	Update(filter) {
		this.SelectBy = filter.selectBy
		this.OrderStatus = filter.orderStatus
		this.StartDate = filter.startDate
		this.EndDate = filter.endDate
		this.FilterByContent = filter.filterByContent
		this.#errorsStack = []
		this.#status = Request.Statuses.Rest
		if (!this.#validateAll()) {
			this.#status = Request.Statuses.Error;
			throw new Error(this.ErrorsStack.join(" "))
		}
		return this
	}
	RecordsTotalCount = async () => {
		let fromLoad = false
		if (this.#status === Request.Statuses.InProcess) {
			fromLoad = true
		} else {
			this.#status = Request.Statuses.InProcess
		}
		if (!this.#validateAll()) {
			this.#status = Request.Statuses.Error;
			throw new Error(this.ErrorsStack.join(" "))
		}
		const data = await this.#apiInterface.recordsTotalCount(this.#createCacheKey())
		if (!fromLoad) {
			this.#status = Request.Statuses.Rest;
		}
		this.#totalCount = data;
		return data
	}
	Load = async (start, end) => {
		this.#status = Request.Statuses.InProcess;
		if (!this.#validateAll()) {
			this.#status = Request.Statuses.Error;
			throw new Error(this.ErrorsStack.join(" "))
		}
		let retVal = [];
		let requestData = [];
		const currentKey = this.#createCacheKey()
		const mapKeyName = this.SelectBy === SelectBy.OrdersType.value ? "OrderNbr" : "InventoryCD";
		requestData = await this.#apiInterface.loadRecords(currentKey, start, end);
		if (requestData.length > 0) {
			retVal = retVal.concat(requestData)
		}
		if (Array.isArray(retVal) && !retVal.length && !requestData.length) {
			this.#status = Request.Statuses.Finished;
			return []
		} else {
			this.#status = Request.Statuses.Rest;
		}
		const _filterByContent = this.FilterByContent.toLowerCase()
		return retVal.filter(d => {
			return d[mapKeyName].toLowerCase().includes(_filterByContent)
		}).sort(function(a, b){
			if(a[mapKeyName] < b[mapKeyName]) { return -1; }
			if(a[mapKeyName] > b[mapKeyName]) { return 1; }
			return 0;
		})
	}
};
export default Request;