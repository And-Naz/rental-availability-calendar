import axios from 'axios'
const AcuRNT = {
	Configs: { headers: { "Content-Type": "application/json" } },
	UrlGeneration: function (url) {
		return window.location.origin + window.location.pathname + '/' + url
	},
	GetRentalOrders: async function (startDate, endDate, radioValue) {
		const params = { startDateStr: '', endDateStr: '', allowShipped: false, allowNotShipped: false, allOpened: false }
		if (startDate instanceof Date) {
			params.startDateStr = startDate.$formatDate("YYYY-MM-DD")
		} else if (typeof startDate === "string") {
			params.startDateStr = startDate
		} else {
			return []
		}
		if (endDate instanceof Date) {
			params.endDateStr = endDate.$formatDate("YYYY-MM-DD")
		} else if (typeof endDate === "string") {
			params.startDateStr = endDate
		} else {
			return []
		}
		switch (radioValue) {
			case "1":
				params.allOpened = true
				break;
			case "2":
				params.allowShipped = true
				break;
			default:
				params.allowNotShipped = true
				break;
		}
		let retVal = await axios.post(this.UrlGeneration("GetRentalOrders"), params, this.Configs)
			.then(response => response.data.d)
		return retVal
	},
	GetRentalItems: async function () {
		let retVal = await axios.post(this.UrlGeneration("GetRentalItems"), {}, this.Configs)
			.then(response => response.data.d)
		return retVal
	},
	GetRentalItemsOrders: async function (startDate, endDate, radioValue, selectedList) {
		const params = { startDateStr: '', endDateStr: '', allowShipped: false, allowNotShipped: false, allOpened: false, itemInfoList: [] }
		if (startDate instanceof Date) {
			params.startDateStr = startDate.$formatDate("YYYY-MM-DD")
		} else if (typeof startDate === "string") {
			params.startDateStr = startDate
		} else {
			return []
		}
		if (endDate instanceof Date) {
			params.endDateStr = endDate.$formatDate("YYYY-MM-DD")
		} else if (typeof endDate === "string") {
			params.startDateStr = endDate
		} else {
			return []
		}
		switch (radioValue) {
			case "1":
				params.allOpened = true
				break;
			case "2":
				params.allowShipped = true
				break;
			case "3":
				params.allowNotShipped = true
				break;
			default:
				params.allOpened = true
				break;
		}
		if (!Array.isArray(selectedList)) {
			return [];
		} else {
			params.itemInfoList = selectedList
		}
		let retVal = await axios.post(this.UrlGeneration("GetRentalItemsOrders"), params, this.Configs)
			.then(response => response.data.d)
		return retVal
	},
}

export default AcuRNT