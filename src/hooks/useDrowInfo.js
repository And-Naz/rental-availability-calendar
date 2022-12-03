
import { useCallback, useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import {actionSetFilter} from "../store/ReduxActions"
import {OrdersType} from "../constants/SelectBy";
import GenerateItemList from "../helpers/GenerateItemList"
import { getOrderInfoOfItems } from "../api"
import useAutoLoad from "./useAutoLoad";
function getState(state) {
    return [state.filter, state.records.selected]
}
function useDrowInfo(openFilter) {
    const [filter, selected] = useSelector(getState)
    const {selectBy, isProcessButtonDisable} = filter
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    
    const onProcess = useCallback((argArray = selected) => {
        if (selectBy === OrdersType.value) {
            const list = GenerateItemList(argArray)
            setData(list)
        } else {
            const len = argArray.length
            const steps = 50
            let chuncks
            const chuncksCount = Math.ceil(len / steps)
            const promiseArray = []
            for (let i = 0; i < chuncksCount; i++) {
                chuncks = [steps * i, steps * (i + 1) - 1]
                promiseArray.push(getOrderInfoOfItems(filter, argArray.slice(...chuncks)))
            }
            Promise.allSettled(promiseArray)
            .then(response => {
                return response.reduce((acc, {status, value}) => {
                    if (status !== "fulfilled") {
                        return acc
                    }
                    if (!Array.isArray(value) || value.length === 0) {
                        return acc
                    }
                    value.forEach(order => {
                        if(acc.has(order.OrderNbr)) {
                            const getObj = acc.get(order.OrderNbr)
                            getObj.Lines = order.Lines
                            acc.set(order.OrderNbr, getObj)
                        } else {
                            acc.set(order.OrderNbr, order)
                        }
                    });
                    return acc
                }, new Map())
            })
            .then(map => {
                return [...map.values()]
            })
            .then(orders => {
                const list = GenerateItemList(orders)
                setData(list)
            })
        }
    }, [selected, filter, selectBy])
    const onClear = useCallback(() => {
        setData([])
        dispatch(actionSetFilter())
    }, [dispatch])
    useEffect(() => {
        setData([])
    }, [selectBy, selected])

    useAutoLoad(setData, filter, () => openFilter(false))
    
    return {
        data,
        onProcess,
        onClear,
        isProcessButtonDisable
    }
}

export default useDrowInfo
