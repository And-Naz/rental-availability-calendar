import {useState, useLayoutEffect, useRef} from 'react'
const StartFindngAndMutating = (arr, findCb, mutateCb) => mutateCb(arr.find(findCb))
function useFindAndMutateFromArray(array = [], findCallback = () => true, mutateCallback = d => d, dependencies) {
    const [state, setState] = useState(StartFindngAndMutating(array, findCallback, mutateCallback))

    const fnRef = useRef();
    fnRef.current = () => {
        setState(StartFindngAndMutating(array, findCallback, mutateCallback)) 
    }
    useLayoutEffect(() => {
        fnRef.current();
    }, dependencies)
    return state;
}
export default useFindAndMutateFromArray;
