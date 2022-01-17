import {useState, useLayoutEffect} from 'react'
const StartFindngAndMutating = (arr, findCb, mutateCb) => mutateCb(arr.find(findCb))
function useFindAndMutateFromArray(array = [], findCallback = () => true, mutateCallback = d => d, dependencies = []) {
    const [state, setState] = useState(StartFindngAndMutating(array, findCallback, mutateCallback))
    const updateState = (newState = []) => { setState(StartFindngAndMutating(newState, findCallback, mutateCallback)) }
    useLayoutEffect(() => {
        updateState(array)
    }, dependencies)
    return state;
}
export default useFindAndMutateFromArray;
