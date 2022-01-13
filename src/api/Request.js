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
			const _errors = indexesOfErrors.map(index => errors[index])
			/* clean already same errors from stac */
			this.#errorsStack.filter(er => !errors.includes(er));
			this.#errorsStack = this.#errorsStack.concat(_errors);
			return false
		} else {
			this.#errorsStack = this.#errorsStack.filter(es => !errors.includes(es));
			return true
		}
	}
	#validateSelectedBy = (value) => () => {
		if(value === this.SelectBy) return true;
		if (!Object.keys(SelectBy).find(key => SelectBy[key].value === value)) {
			return false
		}
		return true;
	};
	#validateOrderStatus = (value) => () => {
		if(value === this.OrderStatus) return true;
		if (!Object.keys(OrderStatuses).find(key => OrderStatuses[key].value === value)) {
			return false
		}	
		return true;
	};
	#validateStartDate = (value) => () => {
		if(value === this.StartDate) return true;
		if (!(value instanceof Date) || value > this.EndDate) {
			return false
		}
		return true
	};
	#validateEndDate = (value) => () => {
		if(value === this.EndDate) return true;
		if (!(value instanceof Date) || value < this.StartDate) {
			return false
		}
		return true
	};
	#validateFilterByContent = (value) => () => {
		if(value === this.FilterByContent) return true;
		if (!(typeof value === "string" || value instanceof String)) {
			return false
		}
		return true
	};
	#validateSteps = (value) => () => {
		if(value === this.Steps) return true;
		if (typeof value !== "number" || Number.isNaN(value)) {
			return false
		}
		return true
	};
	#validateInitStart = (value) => () => {
		if(value === this.InitStart) return true;
		if (typeof value !== "number" || Number.isNaN(value) || value > this.#initEnd) {
			return false
		}
		return true
	};
	#validateInitEnd = (value) => () => {
		if(value === this.InitEnd) return true;
		if (typeof value !== "number" || Number.isNaN(value) || value < this.#initStart) {
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
				this.#validateSteps(this.Steps),
				this.#validateInitStart(this.InitStart),
				this.#validateInitEnd(this.InitEnd)
			],
			[
				Request.Errors.InvalidSelectBy,
				Request.Errors.InvalidOrderStatus,
				Request.Errors.InvalidStartDate,
				Request.Errors.InvalidEndDate,
				Request.Errors.InvalidFilterByContent,
				Request.Errors.InvalidSteps,
				Request.Errors.InvalidInitStart,
				Request.Errors.InvalidInitEnd,
			]
		);
		return this.isValid;
	}
	#createCacheKeyByFilter = () => {
		const _filter = {...this.Filter};
		_filter.startDate = _filter.startDate.FormatDate("YYYY-MM-DD")
		_filter.endDate = _filter.endDate.FormatDate("YYYY-MM-DD")
		delete _filter.initStart;
		delete _filter.initEnd;
		delete _filter.steps
		delete _filter.filterByContent
		const key = Object.keys(_filter).reduce((acc, key) => {
			return acc += `${key}:${_filter[key]}|`
		}, "").slice(0,-1)
		return key
	}
	#takeCacheInfo = async (cacheKey, initStart, initEnd) => {
		let needDoRequest = true
		let requestStart = initStart;
		let requestEnd = initEnd;
		let cacheStart = initStart;
		let cacheEnd = initEnd;
		let inCacheExistsChunck = false;
		let inCacheExistsAll = false
		if (this.#cache[cacheKey] instanceof Map) {
			if(cacheKey in this.#cache) {
				inCacheExistsChunck = true
				const count = await this.RecordsTotalCount()
				const cacheSize = this.#cache[cacheKey].size
				switch (true) {
					case cacheSize < count: 
						if(initEnd <= cacheSize - 1) {
							inCacheExistsAll = true
							needDoRequest = false
							break;
						}
						if(initStart <= cacheSize - 1) {
							cacheEnd = cacheSize - 1
							requestStart = cacheSize
							break;
						}
						if(initStart > cacheSize - 1) {
							break;
						}
					break;
					/*case cacheSize > count: break;*/
					/* TODO: Update cache */
					default:
						inCacheExistsAll = true
					break;
				}
			}
		} else {
			this.#cache[cacheKey] = new Map()
		}
		return { requestStart, requestEnd, inCacheExistsChunck, inCacheExistsAll, cacheStart, cacheEnd, needDoRequest }
	}
	#errorsStack = [];
	#status = Request.Statuses.Empty;
	#apiInterface = null;
	#cache = {};
	#selectBy = SelectBy.OrdersType.value;
	#orderStatus = OrderStatuses.NotShipped.value;
	#lastLoadStart = null;
	#lastLoadEnd = null;
	#startDate = Date.Current;
	#endDate = Date.Current.DayAddedDate(31);
	#filterByContent = "";
	#steps = 0
	#initStart = 0;
	#initEnd = 0;
	get Filter() {
		return {
			selectBy: this.SelectBy,
			orderStatus: this.OrderStatus,
			startDate: new Date(this.StartDate.toISOString()),
			endDate: new Date(this.EndDate.toISOString()),
			filterByContent: this.FilterByContent,
			initStart: this.InitStart,
			initEnd: this.InitEnd,
			steps: this.Steps
		}
	}
	get Status() { return this.#status; };
	get ErrorsStack() { return [...this.#errorsStack] }
	get isValid() { return this.ErrorsStack.length === 0 }
	get Records() {
		const cachedData = this.#cache[this.#createCacheKeyByFilter()]
		if(!(cachedData instanceof Map)) {return []}
		const mapKeyName = this.SelectBy === SelectBy.OrdersType.value ? "OrderNbr" : "InventoryCD";
		const _filterByContent = this.FilterByContent.toLowerCase()
		const _arr = Array.from(cachedData.values())
			.slice(this.InitStart, this.InitEnd)
			.filter(d => d[mapKeyName].toLowerCase().includes(_filterByContent))
		return _arr
	}
	get SelectBy() { return this.#selectBy; };
	set SelectBy(value) {
		this.#validate([this.#validateSelectedBy(value)], [Request.Errors.InvalidSelectBy])
		this.#selectBy = value;
		this.cleanPositions()
	};
	get OrderStatus() { return this.#orderStatus; };
	set OrderStatus(value) {
		this.#validate([this.#validateOrderStatus(value)], [Request.Errors.InvalidOrderStatus])
		this.#orderStatus = value;
		this.cleanPositions()
	};
	get StartDate() { return this.#startDate; };
	set StartDate(value) {
		this.#validate([this.#validateStartDate(value)], [Request.Errors.InvalidStartDate])
		this.#startDate = value;
		this.cleanPositions()
	};
	get EndDate() { return this.#endDate; };
	set EndDate(value) {
		this.#validate([this.#validateEndDate(value)], [Request.Errors.InvalidEndDate])
		this.#startDate = value;
		this.cleanPositions()
	};
	get FilterByContent() {return this.#filterByContent}
	set FilterByContent(value) {
		this.#validate([this.#validateFilterByContent(value)], [Request.Errors.InvalidFilterByContent])
		this.#filterByContent = value;
		this.cleanPositions()
	}
	get Steps() { return this.#steps; };
	set Steps(value) {
		this.#validate([this.#validateSteps(value)], [Request.Errors.InvalidSteps])
		this.#steps = value;
	};
	get InitStart() { return this.#initStart }
	set InitStart(value) {
		this.#validate([this.#validateInitStart(value)], [Request.Errors.InvalidInitStart])
		this.#initStart = value;
	};
	get InitEnd() { return this.#initEnd }
	set InitEnd(value) {
		this.#validate([this.#validateInitEnd(value)], [Request.Errors.InvalidInitEnd])
		this.#initEnd = value;
	};
	constructor(apiInterface, filter = {}) {
		this.#apiInterface = apiInterface;
		this.#initStart = apiInterface.initStart
		this.#initEnd = apiInterface.initEnd
		this.#steps = apiInterface.steps
		if (Object.getPrototypeOf(filter) === Object.prototype) {
			if("selectBy" in filter) {this.SelectBy = filter.selectBy}
			if("orderStatus" in filter) {this.OrderStatus = filter.orderStatus}
			if("startDate" in filter) {this.StartDate = filter.startDate}
			if("endDate" in filter) {this.EndDate = filter.endDate}
			if("filterByContent" in filter) {this.FilterByContent = filter.filterByContent}
			if("steps" in filter) {this.Steps = this.steps}
			if("initStart" in filter) {this.InitStart = filter.initStart}
			if("initEnd" in filter) {this.InitEnd = filter.initEnd}	
		}
	};
	cleanPositions() {
		this.#lastLoadStart = null;
		this.#lastLoadEnd = null;
	};
	clean() {
		this.#cache = {};
		this.#status = Request.Statuses.Empty;
		this.cleanPositions()
	}
	Update(filter) {
		/* Need return new instance for rerender component */
		return new Request(this.#apiInterface, {steps: this.Steps, initStart: this.InitStart, initEnd: this.InitEnd, ...filter})
	}
	RecordsTotalCount = async () => {
		let fromLoad = false
		if(this.#status === Request.Statuses.InProcess) {
			fromLoad = true
		} else {
			this.#status = Request.Statuses.InProcess
		}
		if (!this.#validateAll()) {
			this.#status = Request.Statuses.Error;
			throw new Error(this.ErrorsStack.join(" "))
		}
		const data = await this.#apiInterface.recordsTotalCount(this.#createCacheKeyByFilter())
		if(!fromLoad) {
			this.#status = Request.Statuses.Rest;
		}
		return data
	}
	Load = async (
		start = (typeof this.#lastLoadStart !== "number") ? this.#initStart : this.#initStart + this.#steps,
		end = (typeof this.#lastLoadEnd !== "number") ? this.#initEnd : this.#lastLoadEnd + this.#steps
	) => {
		this.#status = Request.Statuses.InProcess;
		if (!this.#validateAll()) {
			this.#status = Request.Statuses.Error;
			throw new Error(this.ErrorsStack.join(" "))
		}
		let retVal = [];
		const currentKey = this.#createCacheKeyByFilter()
		const mapKeyName = this.SelectBy === SelectBy.OrdersType.value ? "OrderNbr" : "InventoryCD";
		const cacheInfo = await this.#takeCacheInfo(currentKey, start, end)

		if (cacheInfo.inCacheExistsChunck || cacheInfo.inCacheExistsAll) {
			const dataFromCache = Array.from(this.#cache[currentKey].values())
				.slice(cacheInfo.cacheStart, cacheInfo.cacheEnd)
			retVal = retVal.concat(dataFromCache)
		}
		if (cacheInfo.needDoRequest) {
			let requestData = await this.#apiInterface.loadRecords(currentKey, cacheInfo.requestStart, cacheInfo.requestEnd);
			requestData.forEach(d => {
				this.#cache[currentKey].set(d[mapKeyName], d);
			})
			retVal = retVal.concat(requestData)
		}
		console.colorLog("retVal", "red")
		console.log(retVal);
		if (!cacheInfo.inCacheExistsAll && Array.isArray(retVal) && !retVal.length) {
			const totalCount = await this.#apiInterface.recordsTotalCount(currentKey)
			if (totalCount === this.#lastLoadEnd + 1) {
				this.#status = Request.Statuses.Error;
				throw Request.Errors.InvalidServerResponding;
			}
			this.#status = Request.Statuses.Finished;
			return false
		}
		this.#lastLoadStart = start;
		this.#lastLoadEnd = end;
		this.#status = Request.Statuses.Rest;
		return cacheInfo.needDoRequest;
	}
};
export default Request;