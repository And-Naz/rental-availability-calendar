import React from 'react';
import './css/App.css';
import Board from './components/Board'

function App() {
	console.log(process);
	console.log(process.env);
	console.log(process.env.ALO_BLO);
	return (
		<div className="App">
			<Board />
		</div>
	);
}

export default App;
