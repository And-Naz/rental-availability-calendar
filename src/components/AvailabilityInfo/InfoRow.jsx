import {Children} from "react"
import InfoCell from './InfoCell'
function InfoRow(props) {
    const {startText, displayList} = props
    return (
        <div className='info__row'>
            <InfoCell>{startText}</InfoCell>
            {
                (Array.isArray(displayList) && displayList.length > 0) &&
                displayList.map((dl, key) => {
                    console.log();
                    return (
                        <InfoCell
                            key={key}
                        >
                            {dl}
                        </InfoCell>
                    )
                })
            }
        </div>
    )
}
export default InfoRow
