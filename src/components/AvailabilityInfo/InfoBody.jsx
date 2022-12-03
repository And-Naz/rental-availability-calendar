import InfoRow from './InfoRow';
import DisplayInfo from './DisplayInfo';
function InfoBody(props) {
    const {data, dateRange} = props;
    return (
        <div className='info__body'>
            {
                data.map(item => {
                    const displaInfoComponents = dateRange.map((dr, i) => {
                        return (<DisplayInfo key={`${item.InventoryCD} ${i}`} dateRange={dr} item={item} />)
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