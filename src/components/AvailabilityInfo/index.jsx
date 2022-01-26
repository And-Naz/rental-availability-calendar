import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import InfoHeader from "./InfoHeader"
import InfoBody from "./InfoBody"
import "./style.css"
function getFilter(state) {
    return state.filter
}
function AvailabilityInfo(props) {
    const [data, setData] = useState([])
    const {startDate, endDate} = useSelector(getFilter)
    const [dateRange, setDateRange] = useState(Date.$GenerateDateRangeToEndDate(startDate, endDate))
    useEffect(() => {
        setData(props.data)
    }, [props.data])
    return (
        <div className="info">
            <InfoHeader dateRange={dateRange}/>
            <InfoBody data={data} dateRange={dateRange}/>
        </div>
    )
}

export default AvailabilityInfo
