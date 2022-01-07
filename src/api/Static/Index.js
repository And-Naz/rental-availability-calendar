import ByItems from "./ByItems"
import ByOrders from "./ByOrders"

const staticObject = {
	items: ByItems,
	orders: ByOrders,
	steps: 10,
	initStart: 0,
	initEnd: this.initStart + this.steps,
	loadRecords: function (selectBy, orderStatus, start, end) {

	},
	recordsTotalCount: function (selectBy, orderStatus, start, end) {

	}
}
export default staticObject;