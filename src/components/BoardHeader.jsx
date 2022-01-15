import { memo } from 'react';
import filterIcons from '../icons/icon-filter.svg'
import { AppBar, Toolbar, Button } from '@mui/material';

const imgAttributes = {
	src: filterIcons,
	style: {
		width: '1.75rem'
	}
}

function BoardHeader(props) {
	console.log("Render: BoardHeader");
	return (
		<div className={props.className}>
			<AppBar position="static">
				<Toolbar>
					<Button color="inherit" onClick={props.openFilter}>
						<img {...imgAttributes} alt="filter" />
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default memo(BoardHeader)