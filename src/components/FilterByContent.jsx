import Input from "./uiKits/Input";
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionSetFilterByContent } from '../store/ReduxActions'
import useTimeoutEventHandler from '../hooks/useTimeoutEventHandler'
export default function FilterByContent() {
    const dispatch = useDispatch()
    const getFilterByContent = useCallback(state => state?.filter?.filterByContent, [])
    const highPriorityState = useSelector(getFilterByContent)
    const setHighPriorityState = val => dispatch(actionSetFilterByContent(val))
    const eventInstanceMutator = (prevState, event) => event.target.value;
    const delay = 300;
    const [triggeredValue, triggerFunction] = useTimeoutEventHandler(highPriorityState, setHighPriorityState, eventInstanceMutator, delay)
    console.log("Render: FilterByContent");
    return (<Input value={triggeredValue} onChange={triggerFunction} label="Filter By Content"/>)
}
