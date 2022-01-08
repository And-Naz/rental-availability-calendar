import FilterResponsebyOrders from "./FilterResponsebyOrders";
import OrderStatuses from "../../constants/OrderStatuses";
const exportData = FilterResponsebyOrders.map(ord => {
	ord.Status = OrderStatuses.list[Math.round(Math.random() * 2)].value;
	if (process.env.NODE_ENV === "development") {
		console.log(ord.OrderNbr + " " + ord.Status);
	}
	return ord;
})
export default exportData;