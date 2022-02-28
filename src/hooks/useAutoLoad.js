import { useLayoutEffect, useMemo, useState } from "react"
import {UrlParameters} from "../helpers/UrlHelper"
import {autoLoad} from "../api"
import GenerateItemList from "../helpers/GenerateItemList";
import { ItemsType, OrdersType } from "../constants/SelectBy";
import { useDispatch } from "react-redux";
import { actionSetFilter } from "../store/ReduxActions";
import { AllOpens } from "../constants/OrderStatuses";

async function AutoLoad(urlParams, filter, dispatch, setIsNeedAutoLoaded, setIsAutoLoaded,  setData, callback) {
    let type = null
    if (urlParams && ("InventoryCD" in urlParams) && typeof urlParams.InventoryCD === "string") {
        type = ItemsType.value
    } else if (urlParams && ("OrderNbr" in urlParams) && typeof urlParams.OrderNbr === "string"){
        type = OrdersType.value
    } else {
        return setIsNeedAutoLoaded(false)
    }
    const newFilter = {...filter}
    newFilter.selectBy = type;
    newFilter.orderStatus = AllOpens.value
    const retVal = await autoLoad(
        type === ItemsType.value ? "item" : "order",
        newFilter,
        type === ItemsType.value ? urlParams.InventoryCD : urlParams.OrderNbr
    )
    if (!retVal || (Array.isArray(retVal) && !retVal.length)) { return setIsNeedAutoLoaded(false) }
    const selected = GenerateItemList(retVal)
    await dispatch(actionSetFilter(newFilter))
    await setIsNeedAutoLoaded(false)
    await setIsAutoLoaded(true)
    await setData(selected)
    return await callback()
}

function useAutoLoad(setData, filter, callback) {
    const [isNeedAutoLoaded, setIsNeedAutoLoaded] = useState(true)
    const [isAutoLoaded, setIsAutoLoaded] = useState(false)
    const urlParams = useMemo(() => UrlParameters(), [])
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        if (isNeedAutoLoaded) {
            AutoLoad(urlParams, filter, dispatch, setIsNeedAutoLoaded, setIsAutoLoaded, setData, callback)
        }
    }, [isNeedAutoLoaded, urlParams])
    return isAutoLoaded
}

export default useAutoLoad
