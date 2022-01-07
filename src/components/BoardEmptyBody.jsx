import { useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function BoardEmptyBody(props) {
	const style = useMemo(() => ({
		height: "100%",
		width: "100%",
		display: 'flex',
		justifyContent: "center",
		alignItems: "center"
	}), [])
	return (
		<div style={style}>
			{
				!props.isLoading
					?
					<div>
						<div>IIG Rental Availability Calendar.</div>
					</div>
					:
					<div>
						<div>
							<CircularProgress />
						</div>
					</div>
			}
		</div>
	)
}

export default BoardEmptyBody;