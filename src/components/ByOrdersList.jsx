import useRequestApi from '../hooks/useRequestApi';
import { useEffect, useState } from 'react';
function ByOrdersList(props) {
	const steps = 100;
	const [chuncks, setChuncks] = useState([0, 99])
	const { records, load, getStatus, getErrorStack, getCount } = useRequestApi(chuncks)
	useEffect(() => (console.log(getCount()), console.log(records)), [records])
	return (
		<div>
			{
				// records.map(d => <p key={d[recordsKeysName[0]]}>{d[recordsKeysName[0]]}</p>)
			}
		</div>
	)
}

export default ByOrdersList;