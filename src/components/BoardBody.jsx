import { memo, useMemo } from 'react';
import BoardEmptyBody from './BoardEmptyBody';
import AvailabilityInfo from './AvailabilityInfo';
const style = {
	height: "100%",
	width: "100%",
	display: 'flex',
	justifyContent: "center",
	alignItems: "center"
}
function BoardBody(props) {
	const isDataEmpty = useMemo(() => {
		if (Array.isArray(props.data) && props.data.length > 0) {
			return false
		}
		return true
	}, [props.data])
	return (
		<div style={style}>
			{
				isDataEmpty
					?	<BoardEmptyBody isLoading={false} />
					:	<AvailabilityInfo data={props.data}/>
			}
		</div>
	)
}

export default memo(BoardBody);