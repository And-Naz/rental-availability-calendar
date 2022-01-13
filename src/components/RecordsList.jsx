import {memo} from 'react'
import ByOrdersList from './ByOrdersList';
import ByItemsList from './ByItemsList';
import { OrdersType, ItemsType } from '../constants/SelectBy';
import { useSelector } from 'react-redux'
function getSelectBy(state) {
    return state.filter.selectBy
}
function RecordsList() {
    const selectBy = useSelector(getSelectBy)
    console.log("Render: RecordsList");
    return (
        <div>
            {
                (() => {
                    switch (selectBy) {
                        case OrdersType.value:
                            return <ByOrdersList />;
                        case ItemsType.value:
                            return <ByItemsList />;
                        default:
                            return null;
                    }
                })()
            }
        </div>
    )
}

export default memo(RecordsList)
