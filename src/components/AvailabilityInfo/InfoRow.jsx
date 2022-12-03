import InfoCell from './InfoCell'
function InfoRow(props) {
    const {startText, displayList} = props
    return (
        <div className='info__row'>
            <InfoCell>{startText}</InfoCell>
            {
                (Array.isArray(displayList) && displayList.length > 0) &&
                displayList.map((dl, key) => {
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
