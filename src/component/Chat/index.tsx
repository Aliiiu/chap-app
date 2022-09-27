import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { messageReceived } from '../../redux/feature/messageSlice';
import { resetAuthToken } from '../../utils/authUtils';
import MessageList from '../MessageList';
import './index.css';

const Chat = ({ client }: { client: any }) => {
	const [currentMessage, setCurrentMessage] = useState('');
	const dispatch = useAppDispatch();
	const { userName } = useAppSelector((state) => state.user);
	function padTo2Digits(num: number) {
		return num.toString().padStart(2, '0');
	}
	const sendMessage = () => {
		if (currentMessage !== '') {
			let strName = '';
			if (userName.charAt(0) === userName.charAt(0).toUpperCase()) {
				strName = userName;
			} else {
				const str: string = userName;
				strName = str.charAt(0).toUpperCase() + str.slice(1);
			}
			const messageData = {
				author: strName,
				message: currentMessage,
				time:
					padTo2Digits(new Date(Date.now()).getHours()) +
					':' +
					padTo2Digits(new Date(Date.now()).getMinutes()),
			};
			client.send(JSON.stringify({ type: 'send-message', messageData }));
		}
		setCurrentMessage('');
	};

	React.useEffect(() => {
		client.onmessage = (message: any) => {
			const dataFromServer = JSON.parse(message.data);
			dispatch(messageReceived(dataFromServer.messageData));
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [client]);
	return (
		<div className='chat-window'>
			<div className='chat-header'>
				<p>Live Chat</p>
			</div>
			<MessageList />
			<div className='chat-footer'>
				<input
					type='text'
					value={currentMessage}
					placeholder='Hey...'
					onChange={(event) => {
						setCurrentMessage(event.target.value);
					}}
					onKeyDown={(event) => {
						event.code === 'Enter' && sendMessage();
					}}
				/>
				<button onClick={sendMessage}>&#9658;</button>
			</div>
			<div className='exitBtn'>
				<button
					onClick={() => {
						resetAuthToken();
						window.location.reload();
					}}
				>
					Exit
				</button>
			</div>
		</div>
	);
};

export default Chat;
