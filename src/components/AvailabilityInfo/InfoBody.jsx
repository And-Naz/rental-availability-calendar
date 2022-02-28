import { useMemo } from 'react';
import InfoRow from './InfoRow';
import DisplayInfo from './DisplayInfo';
function InfoBody(props) {
    const {data, dateRange} = props

    return (
        <div className='info__body'>
            {
                data.map(item => {
                    const displaInfoComponents = dateRange.map(dr => {
                        return (<DisplayInfo key={item.InventoryCD + dr.toISOString()} date={dr} item={item} showOnlyAvailable={false}/>)
                    })
                    return (
                        <InfoRow key={item.InventoryCD} startText={item.InventoryCD} displayList={displaInfoComponents}/>
                    )
                })
            }
        </div>
    )
}

export default InfoBody;