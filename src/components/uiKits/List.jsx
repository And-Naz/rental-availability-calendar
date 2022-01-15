import { useRef, useEffect, useState } from "react";
function List({ currentRecords, keyName }) {

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
