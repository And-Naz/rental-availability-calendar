import useRequestApi from '../hooks/useRequestApi';
function ByOrdersList(props) {
	const { records, load, getStatus, getErrorStack, getCount } = useRequestApi()
	return (
		<div>
			{
				// records.map(d => <p key={d[recordsKeysName[0]]}>{d[recordsKeysName[0]]}</p>)
			}
		</div>
	)
}

export default ByOrdersList;