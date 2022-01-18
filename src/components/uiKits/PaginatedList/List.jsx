import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from "../Checkbox"
function List(props) {
	const {
		currentRecords,
		className,
		keyName,
		active = null,
		onListClick = Function.prototype,
		isLoading,
		displayName
	} = props
	// const handleListClick = (e) => {
	// 	let checkInState = false
	// 	let target = e.target
	// 	if(target.tagName === "UL") {return}
	// 	if(target.tagName === "SPAN" && target.classList.contains("list__items__text")) {
	// 		target = target.parentNode
	// 	}
	// 	else if (target.tagName === "INPUT" && target.type === "checkbox") {
	// 		target = target.parentNode.parentNode
	// 		checkInState = true
	// 	}
	// 	const recData = target.dataset.rec
	// 	changeActiv(recData)
	// }
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
						?
							currentRecords.map(rec => {
								return (
									<li
										key={rec[keyName]}
										data-rec={rec[keyName]}
										/* -> Don't use === because then need to convert to string  */
										className={active == rec[keyName] ? "list__items--active": null}
									>
										<Checkbox /> {/* onChange={onChangeCheckbox} */}
										<span className="list__items__text">{rec[displayName]}</span>
									</li>
								);
							})
						:
							<span className="list__items__state_info">Empty</span>
			}
		</ul>
	);
}

export default List;
