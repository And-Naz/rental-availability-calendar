import axios from 'axios'
const AcuRNT = {
	Configs: { headers: { "Content-Type": "application/json" } },
	UrlGeneration: function (url) {
		return window.location.origin + window.location.pathname + '/' + url
	},
	loadRecords: async function (filter, start = this.initStart, end = this.initEnd) {
		const _filter = this._getKeys(filter)
		console.log(_filter);
		console.log(`start ${start} end ${end}`);
		const retVal = await axios.post(this.UrlGeneration("LoadRecords"), { filter: _filter, start, end }, this.Configs)
		console.log(retVal);
		return []
	},
	recordsTotalCount: async function (filter) {
		const _filter = this._getKeys(filter)
		console.log(_filter);
		const retVal = await axios.post(this.UrlGeneration("RecordsTotalCount"), {filter: _filter}, this.Configs)
		console.log(retVal);
		return []
	},
	_getKeys: function (keySource) {
		let key
		let value;
		return keySource.split("|").reduce((acc, str) => {
			[key, value] = str.split(":")
			acc[key] = value
			return acc
		}, {})
	},
	helpers: {
		getOrderInfoOfItems: async function (filter, items) {
			const _filter = this._getKeys(filter)
			console.log(_filter);
			const retVal = await axios.post(this.UrlGeneration("GetOrderInfoOfItems"), { filter: _filter, items }, this.Configs)
			console.log(retVal);
			return []
		}
	}
	// GetRentalOrders: async function (startDate, endDate, radioValue) {
	// 	const params = { startDateStr: '', endDateStr: '', allowShipped: false, allowNotShipped: false, allOpened: false }
	// 	if (startDate instanceof Date) {
	// 		params.startDateStr = startDate.$formatDate("YYYY-MM-DD")
	// 	} else if (typeof startDate === "string") {
	// 		params.startDateStr = startDate
	// 	} else {
	// 		return []
	// 	}
	// 	if (endDate instanceof Date) {
	// 		params.endDateStr = endDate.$formatDate("YYYY-MM-DD")
	// 	} else if (typeof endDate === "string") {
	// 		params.startDateStr = endDate
	// 	} else {
	// 		return []
	// 	}
	// 	switch (radioValue) {
	// 		case "1":
	// 			params.allOpened = true
	// 			break;
	// 		case "2":
	// 			params.allowShipped = true
	// 			break;
	// 		default:
	// 			params.allowNotShipped = true
	// 			break;
	// 	}
	// 	let retVal = await axios.post(this.UrlGeneration("GetRentalOrders"), params, this.Configs)
	// 		.then(response => response.data.d)
	// 	return retVal
	// },
	// GetRentalItems: async function () {
	// 	let retVal = await axios.post(this.UrlGeneration("GetRentalItems"), {}, this.Configs)
	// 		.then(response => response.data.d)
	// 	return retVal
	// },
	// GetRentalItemsOrders: async function (startDate, endDate, radioValue, selectedList) {
	// 	const params = { startDateStr: '', endDateStr: '', allowShipped: false, allowNotShipped: false, allOpened: false, itemInfoList: [] }
	// 	if (startDate instanceof Date) {
	// 		params.startDateStr = startDate.$formatDate("YYYY-MM-DD")
	// 	} else if (typeof startDate === "string") {
	// 		params.startDateStr = startDate
	// 	} else {
	// 		return []
	// 	}
	// 	if (endDate instanceof Date) {
	// 		params.endDateStr = endDate.$formatDate("YYYY-MM-DD")
	// 	} else if (typeof endDate === "string") {
	// 		params.startDateStr = endDate
	// 	} else {
	// 		return []
	// 	}
	// 	switch (radioValue) {
	// 		case "1":
	// 			params.allOpened = true
	// 			break;
	// 		case "2":
	// 			params.allowShipped = true
	// 			break;
	// 		case "3":
	// 			params.allowNotShipped = true
	// 			break;
	// 		default:
	// 			params.allOpened = true
	// 			break;
	// 	}
	// 	if (!Array.isArray(selectedList)) {
	// 		return [];
	// 	} else {
	// 		params.itemInfoList = selectedList
	// 	}
	// 	let retVal = await axios.post(this.UrlGeneration("GetRentalItemsOrders"), params, this.Configs)
	// 		.then(response => response.data.d)
	// 	return retVal
	// },
}

export default AcuRNT