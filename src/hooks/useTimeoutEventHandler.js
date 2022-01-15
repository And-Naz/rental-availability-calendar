import { useState, useCallback, useEffect, useRef } from 'react'
const defaultValue = null;
const defaultFunc = v => v;
const defaultDelay = null;
export default function useTimeoutEventHandler(value = defaultValue, setValue = defaultFunc, eventInstanceMutator = defaultFunc, delay = defaultDelay, defaultState = null) {
    
    const [triggeredValue, setTriggeredValue] = useState(defaultState)
    const triggerFunction = useCallback((...args) => setTriggeredValue(prev => eventInstanceMutator(prev, ...args)), [])

    const timeoutRef = useRef(null)
    const timeoutCallback = useCallback(setValue, [])

    useEffect(() => {
        if(value === triggeredValue) return
        setTriggeredValue(value)
    }, [value])

    useEffect(() => {
        if(triggeredValue === value) return
        timeoutRef.current = setTimeout(timeoutCallback, delay, triggeredValue)
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [triggeredValue])
    return [triggeredValue, triggerFunction]
}
