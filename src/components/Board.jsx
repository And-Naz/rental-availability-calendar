import { useState } from 'react';
import FilterModal from './FilterModal';
import BoardHeader from './BoardHeader'
import BoardBody from './BoardBody';
import { makeStyles } from '@mui/styles';
import useToggle from '../hooks/useToggle';
import useDrowInfo from '../hooks/useDrowInfo';

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
	const [openFilter, setOpenFilter] = useToggle(true);
	const {data, onProcess, onClear, isProcessButtonDisable} = useDrowInfo(setOpenFilter)
	return (
		<div className={classes.board}>
			<FilterModal
				open={openFilter}
				closeFilter={setOpenFilter}
				onProcess={onProcess}
				onClear={onClear}
				isProcessButtonDisable={isProcessButtonDisable}
			/>
			<BoardHeader className={classes.header} openFilter={setOpenFilter} />
			<BoardBody className={classes.body} data={data} />
		</div>
	);
}

export default Board;