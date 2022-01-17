import { useRef, useEffect, useState } from "react";
import Checkbox from "../Checkbox"
function List(props) {
	const {
		currentRecords,
		className,
		keyName,
		active = null,
		changeActiv = Function.prototype
	} = props
	return (
		<ul className={className}>
			{
				Array.isArray(currentRecords) && currentRecords.length
					? currentRecords.map(rec => {
						return (
							<li
								key={rec[keyName]}
								className={active === rec[keyName] ? "list__items--active": null}
								onClick={(e) => changeActiv(rec[keyName])}
							>
								<Checkbox />
								<span>{rec[keyName]}</span>
							</li>
						);
					})
					: "No Data"
			}
		</ul>
	);
}

export default List;
