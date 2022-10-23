import { useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function BoardEmptyBody(props) {
	const style = useMemo(() => ({
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	}), [])
	return (
		!props.isLoading
		?
			<div style={style}>
				<div>IIG Rental Availability Calendar.</div>
			</div>
		:
			<div style={style}>
				<CircularProgress />
			</div>
	)
}

export default BoardEmptyBody;