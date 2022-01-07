import SelectBy from "../constants/SelectBy"
import OrderStatuses from "../constants/OrderStatuses"
class FilterModel {
    /* Type of Select By */
    static OrdersType = SelectBy.OrdersType
    static ItemsType = SelectBy.ItemsType
    static TypesInfo = SelectBy.list
    static DefaultType = SelectBy.ItemsType
    /* Order Statuses */
    static StatusShipped = OrderStatuses.Shipped
    static StatusNotShipped = OrderStatuses.NotShipped
    static StatusAllOpens = OrderStatuses.AllOpens
    static StatusesInfo = OrderStatuses.list
    static DefaultStatus = OrderStatuses.Shipped
    
    #type = FilterModel.DefaultType
    get Type() {return this.#type}
    set Type(value) {
        if(!FilterModel.TypesInfo.find(ti => ti.value === value)) {throw new Error(`The ${value} is invalid Type!`)}
        this.#type = value
    }
    #status = FilterModel.DefaultStatus
    get Status() {return this.#status}
    set Status(value) {
        if(!FilterModel.StatusesInfo.find(ti => ti.value === value)) {throw new Error(`The ${value} is invalid Status!`)}
        this.#status = value
    }
    #records = []
    #selectedRecords = []
    // Update(prop, value) {
    //     this[prop] = value;
    //     return this
    // }
}

export default FilterModel

