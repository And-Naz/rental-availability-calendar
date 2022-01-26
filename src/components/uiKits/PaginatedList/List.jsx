import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from "../Checkbox"
function List(props) {
	const {
		currentRecords,
		className,
		keyName,
		active,
		onListClick,
		isLoading,
		displayName,
		isCheckedFunc
	} = props
	return (
		<ul
			className={className}
			onClick={onListClick}
		>
			{
				isLoading
					?
					<span className="list__items__state_info"><CircularProgress /></span>
					:
					(Array.isArray(currentRecords) && currentRecords.length)
						? currentRecords.map(rec => {
							return (
								<li
									key={rec[keyName]}
									data-rec={rec[keyName]}
									className={(active && active === rec[keyName]?.toString()) ? "list__items--active" : null}
								>
									<Checkbox checked={isCheckedFunc(rec[keyName])} /> {/* onChange={onChangeCheckbox} */}
									<span className="list__items__text">{rec[displayName]}</span>
								</li>
							);
						})
						: null
			}
		</ul>
	);
}

export default List;
