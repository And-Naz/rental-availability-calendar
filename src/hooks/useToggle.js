import { useCallback, useState } from 'react'
export default function useToggle(defaultValue) {
    const [value, setValue] = useState(defaultValue)
    const toggleValue = useCallback((val) => {setValue(prevValue => (typeof val === "boolean" ? val : !prevValue))}, [])
    return [value, toggleValue]
}
