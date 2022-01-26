import {useMemo} from "react"
import InfoRow from './InfoRow';
function InfoHeader(props) {
    const style = {
        width: 220,
        fontSize: 18,
        fontWeight: 'bold'
    }
    const {dateRange} = props
    const displayList = useMemo(() => dateRange.map(dr => dr.$formatDate("MM/DD/YYYY")), [dateRange])
    return (
        <div className="info__header">
            <InfoRow startText="" displayList={displayList} />
        </div>
    )
}

export default InfoHeader;