import {useState} from 'react'

function useArray(defaultValue = []) {
    const [array, setArray] = useState(defaultValue)
    function push(element) {
        setArray(prev = prev.concat(element))
    }
    function filter(callback = v => true) {
        setArray(prev = prev.filter(callback))
    }
    function update(index, newElement) {
        if (arguments.length < 2) { return false }
        setArray(prev => ([
            ...prev.slice(0, index),
            newElement,
            ...prev.slice(index + 1, prev.length)
        ]))
    }
    function remove(index) {
        setArray(prev => ([
            ...prev.slice(0, index),
            ...prev.slice(index + 1, prev.length)
        ]))
    }
    function clear() {
        setArray([])
    }
    return {push, filter, update, remove, clear}
}

export default useArray
