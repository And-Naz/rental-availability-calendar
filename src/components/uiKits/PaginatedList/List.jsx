import { useRef, useEffect, useState } from "react";
function List(props) {
	const { currentRecords, keyName } = props
	return (
		<ul className="list">
			{
				Array.isArray(currentRecords) && currentRecords.length
					? "Data"
					: "No Data"
			}
		</ul>
	);
}

export default List;
