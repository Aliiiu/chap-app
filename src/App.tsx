import React, { useEffect } from 'react';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useAppSelector } from './hook';
import { isLoggedIn, setAuthState } from './utils/authUtils';
import LoginForm from './component/LoginForm';
import Chat from './component/Chat';

const PORT = process.env.PORT || 3000;

const client = new W3CWebSocket(`ws://127.0.0.1:${PORT}`);

function App() {
	const { userName } = useAppSelector((state) => state.user);
	useEffect(() => {
		client.onopen = () => {
			console.log('Websocket client connected');
		};
	}, []);
	const joinRoom = () => {
		if (userName !== '') {
			setAuthState(userName);
			window.location.reload();
		}
	};

	return (
		<div className='App'>
			{!isLoggedIn() ? (
				<LoginForm joinRoom={joinRoom} />
			) : (
				<Chat client={client} />
			)}
		</div>
	);
}

export default App;
