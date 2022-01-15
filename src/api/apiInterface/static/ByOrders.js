import { Shipped, NotShipped } from "../../../constants/OrderStatuses";
import FilterResponsebyOrders from "./FilterResponsebyOrders";
const exportData = FilterResponsebyOrders.map(ord => {
	ord.Status = (([Shipped, NotShipped])[Math.round(Math.random())]).value;
	if (process.env.NODE_ENV === "development") {
		console.colorLog(ord.OrderNbr + " " + ord.Status, "green");
	}
	return ord;
})
export default exportData;