import { CreatingConstant, elemGen} from '../Helpers/CreatingConstant';
export const Shipped = "1";
export const NotShipped = "2";
export const AllOpens = "3";
const constant = CreatingConstant(
    elemGen("Shipped", Shipped, "Shipped"),
    elemGen("NotShipped", NotShipped, "Not Shipped"),
    elemGen("AllOpens", AllOpens, "All Opens")
);
export default constant;