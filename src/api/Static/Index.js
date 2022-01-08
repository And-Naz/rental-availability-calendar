import ByItems from "./ByItems"
import ByOrders from "./ByOrders"
import { OrdersType, ItemsType } from "../../constants/SelectBy";
import { AllOpens } from "../../constants/OrderStatuses"

const staticObject = {
	items: ByItems,
	orders: ByOrders,
	steps: 10,
	initStart: 0,
	initEnd: 10,
	loadRecords: async function (selectBy, orderStatus, startDate, endDate, start = this.initStart, end = this.initEnd) {
		let data = null;
		switch (selectBy) {
			case OrdersType:
				data = await this.orders.filter(ord => {
					return (
						(AllOpens === orderStatus || ord.Status === orderStatus) &&
						ord.Lines.some(l => {
							return (
								l.StartDateTime <= endDate.toISOString() || l.EndDateTime >= startDate.toISOString()
							)
						})
					);
				})
				break;
			case ItemsType:
				data = this.items
				break;
			default:
				data = [];
				break;
		}
		if (data.length) {
			const tmpData = data.slice(start, end)
			return tmpData
		}
		return data
	},
	recordsTotalCount: async function (selectBy, orderStatus, startDate, endDate) {
		switch (selectBy) {
			case OrdersType:
				return await this.orders.filter(ord => {
					return (
						(AllOpens === orderStatus || ord.Status === orderStatus) &&
						ord.Lines.some(l => {
							return (
								l.StartDateTime <= endDate.toISOString() || l.EndDateTime >= startDate.toISOString()
							)
						})
					);
				}).length
			case ItemsType:
				return this.items.length
			default:
				return 0;
		}
	}
}
export default staticObject;