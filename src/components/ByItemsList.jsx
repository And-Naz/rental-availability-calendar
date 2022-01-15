import useRequestApi from '../hooks/useRequestApi';
function ByItemsList(props) {
	console.log(typeof useRequestApi);
	// const {records, load, getStatus, getErrorStack} = useRequestApi()
	// console.log(records);
	// (async () => {
	// 	console.log(typeof load);
	// 	return
	// 	await load(1,30)
	// 	console.log(records);
	// })()
	return (
		<div>
			{
				// records.map(d => <p key={d[recordsKeysName[0]]}>{d[recordsKeysName[0]]}</p>)
			}
		</div>
	)
}

export default ByItemsList;