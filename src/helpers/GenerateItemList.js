function GenerateItemList(rentalOrders) {
    if (!Array.isArray(rentalOrders) || rentalOrders.length === 0) {return []}
    const ItemList = new Map();
    rentalOrders.forEach(ro => {
        ro.Lines.forEach(item => {
            const {InventoryCD, SerialNbr, IsSerial, OnHand, AvailQty, LineNbr} = item
            const key = JSON.stringify({InventoryCD, SerialNbr, IsSerial})
            let mapOldValuesArray = ItemList.get(key)
            let mapAdditionValue = {OrderNbr: ro.OrderNbr, Customer: ro.Customer, ...item};
            delete mapAdditionValue.InventoryCD
            delete mapAdditionValue.SerialNbr
            delete mapAdditionValue.IsSerial
            delete mapAdditionValue.OnHand
            delete mapAdditionValue.AvailQty
            delete mapAdditionValue.LineNbr
            let newData = { InventoryCD, IsSerial, SerialNbr, OnHand, AvailQty, LineNbr, info: [mapAdditionValue]}
            if (mapOldValuesArray) {
                mapOldValuesArray.info.push(mapAdditionValue)
                newData = mapOldValuesArray;
            }
            ItemList.set(key, newData);
        })
    })
    return [...ItemList.values()];
}
export default GenerateItemList;
