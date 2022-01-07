import SelectBy from "../constants/SelectBy";
import OrderStatuses from "../constants/OrderStatuses";
import ErrorsOfRequestInstance from "../constants/ErrorsOfRequestInstance";
class Request {
	static Errors = ErrorsOfRequestInstance;
	static CheckingMiddleweare = function (...callbacks) {
		return callbacks.reduce((acc, cb, index, arr) => {
			const retVal = cb(acc, index, arr)
			if (!retVal) {
				acc.push(index)
			}
		}, []);
	}
	#errorsStack = [];
	get ErrorsStack() { return [...this.#errorsStack] }
	get isValid() { return this.ErrorsStack.length === 0 }
	#validate(callbacks, errors) {
		const indexesOfErrors = Request.CheckingMiddleweare(callbacks);
		if (indexesOfErrors.length) {
			const errors = indexesOfErrors.map(index => errors[index])
				.filter(er => !errors.includes(er))
			this.#errorsStack = this.#errorsStack.concat(errors)
			return false
		} else {
			this.#errorsStack = this.#errorsStack.filter(es => !errors.includes(es));
			return true
		}
	}
	#validateSelectedBy = (value) => () => {
		if (!SelectBy.list.find(sb => value === sb.value)) {
			return false
		}
		return true;
	};
	#validateOrderStatus = (value) => () => {
		if (!OrderStatuses.list.find(os => value === os.value)) {
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
	#api = null;
	#loadedRecords = [];
	#selectBy = SelectBy.ItemsType;
	#orderStatus = OrderStatuses.NotShipped;
	#lastLoadStart = null;
	#lastLoadEnd = null;
	#startDate = Date.Current;
	#endDate = Date.Current.DayAddedDate(31);
	get LoadedRecords() { return this.#loadedRecords }
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
		this.#loadedRecords = [];
		this.#lastLoadStart = null;
		this.#lastLoadEnd = null;
	}
	Update({ selectBy, orderStatus, startDate, endDate, steps }) {
		selectBy && (this.SelectBy = selectBy);
		orderStatus && (this.OrderStatus = orderStatus);
		startDate && (this.StartDate = startDate);
		endDate && (this.EndDate = endDate);
		steps && (this.Steps = steps);
	}
	RecordsTotalCount = async () => {
		if (!this.#validateAll()) {
			throw new Error(this.ErrorsStack.join(" "))
		}
		return this.#api.recordsTotalCount(this.#selectBy, this.#orderStatus, start, end)
	}
	LoadRecords = async (
		start = (!this.#lastLoadStart) ? this.#api.initStart : this.#lastLoadStart + this.#api.steps,
		end = (!this.#lastLoadEnd) ? this.#api.initEnd : this.#lastLoadEnd + this.#api.steps
	) => {
		if (!this.#validateAll()) {
			throw new Error(this.ErrorsStack.join(" "))
		}
		const newData = await this.#api.loadRecords(this.#selectBy, this.#orderStatus, start, end);
		this.#loadedRecords = this.#loadedRecords.concat(newData);
		this.#lastLoadStart = start;
		this.#lastLoadEnd = end;
		return this.#loadedRecords;
	}

};

export default Request;