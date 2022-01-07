import { CreatingConstant, elemGen } from '../helpers/CreatingConstant';
export const OrdersType = "OrdersType";
export const ItemsType = "ItemsType";
const constant = CreatingConstant(
	elemGen("OrdersType", OrdersType, "Orders"),
	elemGen("ItemsType", ItemsType, "Items")
)
export default constant;