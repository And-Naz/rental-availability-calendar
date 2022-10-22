import {useMemo} from "react"
import InfoRow from './InfoRow';
function InfoHeader(props) {
    const { dateRange } = props
    const displayList = useMemo(() => {
        return dateRange.map(dr => {
            if (dr.length === 1) {
                return dr[0].$formatDate("MM/DD/YYYY")
            } else if(dr.length > 1) {
                return `${dr[0].$formatDate("MM/DD/YYYY")} - ${dr[dr.length - 1].$formatDate("MM/DD/YYYY")}`
            }
            return ""
        })
    }, [dateRange])
    return (
        <div className="info__header">
            <InfoRow startText="" displayList={displayList} />
        </div>
    )
}

export default InfoHeader;