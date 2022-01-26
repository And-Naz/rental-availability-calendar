import { memo, useLayoutEffect } from 'react'
import ByOrdersList from './ByOrdersList';
import ByItemsList from './ByItemsList';
import { OrdersType, ItemsType } from '../constants/SelectBy';
import { useSelector, useDispatch } from 'react-redux'
import { actionSetCurrentRecordsSync } from '../store/ReduxActions';
function getSelectBy(state) {
	return state.filter.selectBy
}
function RecordsList() {
	const dispatch = useDispatch()
	const selectBy = useSelector(getSelectBy)
	useLayoutEffect(() => {
		dispatch(actionSetCurrentRecordsSync([]))
	}, [selectBy, dispatch])
	console.log("Render: RecordsList");
	return (
		<div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
			{
				(() => {
					switch (selectBy) {
						case OrdersType.value:
							return <ByOrdersList />;
						case ItemsType.value:
							return <ByItemsList />;
						default:
							return "Invalid Select By Option.";
					}
				})()
			}
		</div>
	)
}

export default memo(RecordsList)
