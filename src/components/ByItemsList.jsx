import useRequestApi from '../hooks/useRequestApi';
function ByItemsList(props) {
	const {records, totalCount, load, recordsKeysName} = useRequestApi()
	console.log(totalCount);
	console.log(records);
	return (
		<div>
			{
				records.map(d => <p key={d[recordsKeysName[0]]}>{d[recordsKeysName[0]]}</p>)
			}
		</div>
	)
}

export default ByItemsList;