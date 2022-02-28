export function UrlGeneration(url) {
	return window.location.origin + window.location.pathname + '/' + url
}

export function UrlParameters() {
    const generator = (new URL(document.location.href)).searchParams.entries();
    const skipableValues = ["timeStamp", "PopupPanel", "HideScript"];
    const dataMutationLogic = {
        inventoryCD: {key: "InventoryCD", modifyData: d => d},
        inventoryID: {key: "InventoryID", modifyData: d => parseInt(d)},
        orderNbr: {key: "OrderNbr", modifyData: d => d},
        orderType: {key: "OrderType", modifyData: d => d},
    }
    const data = {};
    let genVal = null;
    while((genVal = generator.next(), !genVal.done)) {
        if(skipableValues.includes(genVal.value[0])) {continue;};
        if (dataMutationLogic[genVal.value[0]]) {
            const {key, modifyData} = dataMutationLogic[genVal.value[0]]
            data[key] = modifyData(genVal.value[1])
        } else {
            data[genVal.value[0]] = genVal.value[1]
        }
    }
    return data;
};