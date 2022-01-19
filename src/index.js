import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import "./utils/DateExtenssions";
import "./utils/ConsoleExtenssions";
import "./utils/ArrayExtenssions"
import {Provider} from "react-redux";
import store from "./store";
import App from './App';
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('root')
);
