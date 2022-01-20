import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
function getSelected(state) {
    return state.records.selected
}
function useIsAllSelected(displayRecords = [], findSelectedCallback = (arg) => arg, dependencies = []) {
    const [value, setValue] = useState(false)
    const selected = useSelector(getSelected)
    useEffect(() => {
        if (!Array.isArray(displayRecords) || !displayRecords.length) {
            setValue(false)
            return
        }
        const selectedRecords = findSelectedCallback(selected)
        if (!Array.isArray(selectedRecords) || !selectedRecords.length) {
            setValue(false)
            return
        }
        setValue(displayRecords.length === selectedRecords.length)
    }, [displayRecords, selected, ...dependencies])
    return value
}
export default useIsAllSelected
