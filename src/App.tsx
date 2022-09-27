import React from 'react';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import Router from './routes/Router';

export const client = new W3CWebSocket('ws://127.0.0.1:3000');

function App() {
	return (
		<div className='App'>
			<Router />
		</div>
	);
}

export default App;
