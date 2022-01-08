import { useState, useEffect } from "react"
import api from "../api";
function ByOrdersList(props) {
	const [list, setList] = useState([]);
	useEffect(() => {
		void (async () => {
			console.log("useLayoutEffect");
			if (await api.Load()) {
				setList(api.Records)
			}
		})()
	}, [])
	console.log("api status: " + api.Status);
	return (
		<div>{
			list.map(elem => <span key={elem.OrderNbr}>{elem.OrderNbr}</span>)
		}</div>
	)
}

export default ByOrdersList;