import { memo, useCallback } from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Checkbox from './uiKits/Checkbox';
import {actionSetShowOnlyAvailable} from '../store/ReduxActions'
import filterIcons from '../icons/icon-filter.svg'

const imgAttributes = {
	src: filterIcons,
	style: {
		width: '1.75rem'
	}
}
const optionsSectionStyles = {
	marginLeft: '1rem',
	padding: '0.25rem 0.5rem',
	backgroundColor: '#fff',
	color: '#000',
	display: 'flex',
	justifyContent: 'center',
	borderRadius: '3px'
}
const getShowOnlyAvailable = state => state.options.showOnlyAvailable
function BoardHeader(props) {
	const dispatch = useDispatch()
	const showOnlyAvailable = useSelector(getShowOnlyAvailable)
	const changeShowOnlyAvailable = useCallback(e => dispatch(actionSetShowOnlyAvailable(e.target.checked)), [dispatch])
	return (
		<div className={props.className}>
			<AppBar position="static">
				<Toolbar>
					<Button color="inherit" onClick={props.openFilter}>
						<img {...imgAttributes} alt="filter" title="filter"/>
					</Button>
					<div style={optionsSectionStyles}>
						<Checkbox
							value={showOnlyAvailable}
							onChange={changeShowOnlyAvailable}
						>
							Show Only Available
						</Checkbox>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default memo(BoardHeader)