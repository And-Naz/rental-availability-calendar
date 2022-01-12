import { useCallback, useEffect, useRef } from 'react'
export default function useTimeout(callback, delay, ...args) {
    const callbackRef = useRef(callback);
    const argsRef = useRef(args);
    const timeoutRef = useRef();
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);
    useEffect(() => {
        argsRef.current = args;
    }, [...args]);
    const set = useCallback((...newArgs) => {
        newArgs.length && (argsRef.current = newArgs)
        timeoutRef.current = setTimeout(() => callbackRef.current(...argsRef.current), delay);
    }, [delay]);
    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);
    useEffect(() => {
        set();
        return clear;
    }, [delay, set, clear]);
    const reset = useCallback((...newArgs) => {
        clear();
        set(...newArgs);
    }, [clear, set])
    return {reset, clear};
};
