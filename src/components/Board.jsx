import { useCallback, useState } from 'react';
import FilterModal from './FilterModal';
import BoardHeader from './BoardHeader'
import BoardBody from './BoardBody';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	board: {
		height: '100%',
		width: '100%',
		position: 'static',
		display: 'flex',
		flexDirection: 'column',
	},
	header: {
		flexGrow: 1,
		width: '100%',
		height: '4rem'
	},
	body: {
		height: 'calc(100vh - 4rem)',
		width: '100%'
	}
}));

function Board(props) {
	const classes = useStyles();
	const [dataForDrow, /*setDataForDrow*/] = useState([])
	const [open, setOpen] = useState(false);
	const openFilter = useCallback(() => setOpen(true), []);
	const closeFilter = useCallback(() => setOpen(false), []);
	console.log("Render: Board");
	return (
		<div className={classes.board}>
			<FilterModal
				open={open}
				closeFilter={closeFilter}
			/>
			<BoardHeader className={classes.header} openFilter={openFilter} />
			<BoardBody className={classes.body} dataForDrow={dataForDrow} />
		</div>
	);
}

export default Board;