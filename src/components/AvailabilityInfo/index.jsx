import {useEffect, useMemo, useState} from "react"
import {useSelector} from "react-redux"
import InfoHeader from "./InfoHeader"
import InfoBody from "./InfoBody"
import "./style.css"
import { FILTER_DATE_TYPE } from "../../constants/FilterDateType"
function getFilter(state) {
    return state.filter
}
function AvailabilityInfo(props) {
    const [data, setData] = useState([])
    const {startDate, endDate, calendarType} = useSelector(getFilter)
    const dateRange = useMemo(() => {
        switch (calendarType) {
            case FILTER_DATE_TYPE.WEEK:
                return Date.$GetWeeksCollection(startDate, endDate)
            case FILTER_DATE_TYPE.MONTH:
                return Date.$GetMonthCollection(startDate, endDate)
            default:
                break;
        }
        return [];
    }, [calendarType, startDate, endDate])

    useEffect(() => {
        setData(props.data)
    }, [props.data])
    return (
        <div className="info">
            <InfoHeader dateRange={dateRange} />
            <InfoBody data={data} dateRange={dateRange} />
        </div>
    )
}

export default AvailabilityInfo
