
import { useCallback, useEffect, useMemo, useState } from "react";
import {useSelector} from "react-redux"
import {OrdersType} from "../constants/SelectBy";
import GenerateItemList from "../helpers/GenerateItemList"
import {getOrderInfoOfItems} from "../api"
function getState(state) {
    return [state.filter, state.records.selected]
}
function useDrowInfo() {
    const [filter, selected] = useSelector(getState)
    const {selectBy} = filter
    const [data, setData] = useState([])
    const onProcess = useCallback(() => {
        if (selectBy === OrdersType.value) {
            setData(GenerateItemList(selected))
        } else {
            const len = selected.length
            const steps = 50
            let chuncks
            const chuncksCount = Math.ceil(len / steps)
            const promiseArray = []
            for (let i = 0; i < chuncksCount; i++) {
                chuncks = [steps * i, steps * (i + 1) - 1]
                promiseArray.push(getOrderInfoOfItems(filter, selected.slice(...chuncks)))
            }
            Promise.allSettled(promiseArray)
            .then(response => {
                return response
            })
            .then(response => {
                return response.reduce((acc, {status, value}) => {
                    if (value.length === 0) {
                        return acc
                    }
                    if (status !== "fulfilled") {
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
                setData(GenerateItemList(orders))
            })
        }
    }, [selected])
    const onClear = useCallback(() => {
        setData([])
    }, [])
    useEffect(() => {
        setData([])
    }, [selectBy, selected])
    return {
        data,
        onProcess,
        onClear
    }
}

export default useDrowInfo
