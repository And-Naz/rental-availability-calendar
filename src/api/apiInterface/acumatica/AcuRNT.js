import axios from 'axios'
const AcuRNT = {
	Configs: { headers: { "Content-Type": "application/json" } },
	loadRecords: async function (filter, start = this.initStart, end = this.initEnd) {
		const _filter = getKeys(filter)
		const retVal = await axios.post(
			UrlGeneration("LoadRecords"),
			{ filter: _filter, start, end },
			this.Configs
		).then(response => response.data.d)
		console.log(retVal);
		return retVal
	},
	recordsTotalCount: async function (filter) {
		const _filter = getKeys(filter)
		const retVal = await axios.post(
			UrlGeneration("RecordsTotalCount"),
			{filter: _filter},
			this.Configs
		).then(response => response.data.d)
		console.log(retVal);
		return retVal
	},
	helpers: {
		getOrderInfoOfItems: async function (filter, items) {
			const retVal = await axios.post(
				UrlGeneration("GetOrderInfoOfItems"),
				{ filter, items },
				this.Configs
			).then(response => response.data.d, console.error)
			.finally(() => {console.log("getOrderInfoOfItems finished");})
			console.log(retVal);
			return retVal
		},
	},
}

function getKeys(keySource) {
	let key
	let value;
	return keySource.split("|").reduce((acc, str) => {
		[key, value] = str.split(":")
		acc[key] = value
		return acc
	}, {})
}

function UrlGeneration(url) {
	return window.location.origin + window.location.pathname + '/' + url
}

export default AcuRNT