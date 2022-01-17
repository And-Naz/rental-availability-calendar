import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from "../Checkbox"
function List(props) {
	const {
		currentRecords,
		className,
		keyName,
		active = null,
		changeActiv = Function.prototype,
		isLoading,
		displayName
	} = props
	const handleListClick = (e) => {
		let target = e.target
		if(target.nodeName === "UL") {return}
		if(target.nodeName === "SPAN" && target.classList.contains("list__items__text")) {
			target = target.parentNode
		}
		else if (target.nodeName === "INPUT") {
			target = target.parentNode.parentNode
		}
		changeActiv(target.dataset.rec)
	}
	return (
		<ul
			className={className}
			onClick={handleListClick}
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
										<Checkbox />
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
