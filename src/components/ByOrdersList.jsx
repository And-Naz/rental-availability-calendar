import useRequestApi from '../hooks/useRequestApi';
import { useState } from 'react';
function ByOrdersList(props) {
	const steps = 50;
	const [chuncks, setChuncks] = useState([0, 49])
	const { records, status, errorStack, count, load } = useRequestApi(chuncks)
	return (
		<div>
			{status}
		</div>
	)
}

export default ByOrdersList;