import {useMemo} from "react"
import InfoRow from './InfoRow';
function InfoHeader(props) {
    // const style = {
    //     width: 220,
    //     fontSize: 18,
    //     fontWeight: 'bold'
    // }
    const {dateRange, newDateRange } = props
    // const displayList = useMemo(() => dateRange.map(dr => dr.$formatDate("MM/DD/YYYY")), [dateRange])
    const newDisplayList = useMemo(() => {
        return newDateRange.map(dr => {
            if (dr.length === 1) {
                return dr[0].$formatDate("MM/DD/YYYY")
            } else if(dr.length > 1) {
                return `${dr[0].$formatDate("MM/DD/YYYY")} - ${dr[dr.length - 1].$formatDate("MM/DD/YYYY")}`
            }
            return ""
        })
    }, [newDateRange])
    return (
        <div className="info__header">
            {/* <InfoRow startText="" displayList={displayList} /> */}
            <InfoRow startText="" displayList={newDisplayList} />
        </div>
    )
}

export default InfoHeader;