import axios from 'axios'
const AcuRNT = {
	Configs: { headers: { "Content-Type": "application/json" } },
	UrlGeneration: function (url) {
		return window.location.origin + window.location.pathname + '/' + url
	},
	loadRecords: async function (filter, start = this.initStart, end = this.initEnd) {
		const _filter = this._getKeys(filter)
		const retVal = await axios.post(
			this.UrlGeneration("LoadRecords"),
			{ filter: _filter, start, end },
			this.Configs
		).then(response => response.data.d)
		console.log(retVal);
		return retVal
	},
	recordsTotalCount: async function (filter) {
		const _filter = this._getKeys(filter)
		const retVal = await axios.post(
			this.UrlGeneration("RecordsTotalCount"),
			{filter: _filter},
			this.Configs
		).then(response => response.data.d)
		console.log(retVal);
		return retVal
	},
	helpers: {
		getOrderInfoOfItems: async function (filter, items) {
			const _filter = this._getKeys(filter)
			const retVal = await axios.post(
				this.UrlGeneration("GetOrderInfoOfItems"),
				{ filter: _filter, items },
				this.Configs
			).then(response => response.data.d)
			console.log(retVal);
			return retVal
		},
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
}

export default AcuRNT