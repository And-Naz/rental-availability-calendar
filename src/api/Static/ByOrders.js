import FilterResponsebyOrders from "./FilterResponsebyOrders";
import * as OrderStatuses from "../../constants/OrderStatuses";
const exportData = FilterResponsebyOrders.map(ord => {
	const randKey = Object.keys(OrderStatuses)[Math.round(Math.random() * 2)]
	ord.Status = OrderStatuses[randKey].value;
	if (process.env.NODE_ENV === "development") {
		console.log(ord.OrderNbr + " " + ord.Status);
	}
	return ord;
})
export default exportData;