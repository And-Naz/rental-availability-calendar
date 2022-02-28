import RadioButtonsSection from "./uiKits/RadioButtonsSection"
import { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionSetOrderStatus } from '../store/ReduxActions'
import * as OrderStatusesConstants from "../constants/OrderStatuses"
export default function OrderStatuses() {
    const getOrderStatus = useCallback(state => state?.filter?.orderStatus, [])
    const value = useSelector(getOrderStatus)
    const dispatch = useDispatch()
    const onChange = useCallback(e => dispatch(actionSetOrderStatus(e.target.value)), [dispatch])
    const list = useMemo(() => Object.keys(OrderStatusesConstants).map(osKeys => OrderStatusesConstants[osKeys]), [])
    return (
        <RadioButtonsSection value={value} onChange={onChange} list={list} label="Order Status"/>
    )
}
