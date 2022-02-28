import ByItems from "./ByItems"
import ByOrders from "./ByOrders"
import { OrdersType, ItemsType } from "../../../constants/SelectBy";
import { AllOpens } from "../../../constants/OrderStatuses"

const staticObject = {
	items: ByItems,
	orders: ByOrders,
	steps: 100,
	initStart: 0,
	initEnd: 99,
	loadRecords: async function (filter, start = this.initStart, end = this.initEnd) {
		const keys = this._getKeys(filter)
		let data = [];
		switch (keys.selectBy) {
			case OrdersType.value:
				await new Promise(res => setTimeout(res, Math.round(Math.random() * 4) * 1000))
				data = await this.orders.filter(ord => {
					return (
						(AllOpens.value === keys.orderStatus || ord.Status === keys.orderStatus) &&
						ord.Lines.some(l => {
							return (
								l.StartDateTime <= keys.endDate || l.EndDateTime >= keys.startDate
							)
						})
					);
				})
				break;
			case ItemsType.value:
				await new Promise(res => setTimeout(res, Math.round(Math.random() * 4) * 1000))
				data = this.items
				break;
			default:
				break;
		}
		if (data.length) {
			const tmpData = data.slice(start, end + 1)
			return tmpData
		}
		return data
	},
	recordsTotalCount: async function (filter) {
		const keys = this._getKeys(filter)
		switch (keys.selectBy) {
			case OrdersType.value:
				return await this.orders.filter(ord => {
					const flag = (AllOpens.value === keys.orderStatus || ord.Status === keys.orderStatus)
						&& ord.Lines.some(l => {
							const _flag = l.StartDateTime <= keys.endDate || l.EndDateTime >= keys.startDate
							return _flag
						})
					return flag;
				}).length
			case ItemsType.value:
				return this.items.length
			default:
				return 0;
		}
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
		getOrderInfoOfItems: async function(filter, items) {//(startDate, endDate, radioValue, selectedList) {
			const params = { startDateStr: '', endDateStr: '', allowShipped: false, allowNotShipped: false, allOpened: false, itemInfoList: []}
			const orders = items.reduce((acc, itemsInfo) => {
				const itemOrders = ByOrders.filter(ord => {
					if(ord.Status !== filter.orderStatus) {return false}
					const newLines = ord.Lines.filter(l => {
						if (l.InventoryCD !== itemsInfo.InventoryCD) {
							return false
						}
						if(l.StartDateTime >= filter.startDate) {
							return false
						}
						if(l.EndDateTime <= filter.endDate) {
							return false
						}
						return true
					})
					if(newLines.length === 0) { return false }
					return {...ord, Lines: newLines}
				})
				if(itemOrders.length > 0) {
					return acc.concat(itemOrders)
				}
				return acc
			}, []);
			
			return orders
		},
		autoLoad: async function() {
			return []
		}
	}
}
export default staticObject;