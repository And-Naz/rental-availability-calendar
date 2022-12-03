import { useEffect, useRef } from 'react'
function useUpdateEffect(callback, dependencies) {
    const firstRenderRef = useRef(true)
    const callbackRef = useRef()
    callbackRef.current = callback;
    useEffect(() => {
        if(firstRenderRef.current) {
            firstRenderRef.current = false
            return
        }
        return callbackRef.current()
    }, dependencies)
}

export default useUpdateEffect;
