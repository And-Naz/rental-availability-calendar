import { useCallback, useLayoutEffect, useState, useMemo } from 'react';
import SelectBy from "../constants/SelectBy";
import OrderStatuses from "../constants/OrderStatuses";
import useRecordsContext from '../hooks/useRecordsContext';
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
	const [dataForDrow, setDataForDrow] = useState([])
	const [open, setOpen] = useState(false);
	const openFilter = useCallback(() => setOpen(true), []);
	const closeFilter = useCallback(() => setOpen(false), []);
	const [loadedRecords, setLoadedRecords] = useState([])
	const [selectedRecords, setSelectedRecords] = useState([])
	const [selectBy, setSelectBy] = useState(SelectBy.OrdersType)
	const onChangeSelectBy = useCallback((e) => setSelectBy(e.target.value), [])
	const [orderStatus, setOrderStatus] = useState(OrderStatuses.NotShipped)
	const onChangeOrderStatus = useCallback((e) => setOrderStatus(e.target.value), [])
	const [startDate, setStartDate] = useState(Date.Current)
	const onChangeStartDate = useCallback((e) => { setStartDate(new Date(e.target.value)) }, [])
	const [endDate, setEndDate] = useState(Date.Current)
	const onChangeEndDate = useCallback((e) => { setEndDate(new Date(e.target.value)) }, [])
	const { Provider } = useRecordsContext()
	const contextData = useMemo(() => ({
		selectBy, orderStatus,
		startDate, onChangeStartDate,
		endDate, onChangeEndDate,
		selectedRecords, setSelectedRecords
	}), [selectBy, orderStatus, startDate, endDate, selectedRecords])
	useLayoutEffect(() => { setSelectedRecords([]); setLoadedRecords([]) }, [selectBy, orderStatus, startDate, endDate])
	console.log("Render: Board");
	return (
		<div className={classes.board}>
			<Provider value={contextData}>
				<FilterModal
					open={open}
					closeFilter={closeFilter}
					// startDate={startDate}
					// onChangeStartDate={onChangeStartDate}
					// endDate={endDate}
					// onChangeEndDate={onChangeEndDate}
					selectBy={selectBy}
					onChangeSelectBy={onChangeSelectBy}
					SelectBy={SelectBy}
					orderStatus={orderStatus}
					onChangeOrderStatus={onChangeOrderStatus}
					OrderStatuses={OrderStatuses}

				/>
				<BoardHeader className={classes.header} openFilter={openFilter} />
				<BoardBody className={classes.body} dataForDrow={dataForDrow} />
			</Provider>
		</div>
	);
}

export default Board;