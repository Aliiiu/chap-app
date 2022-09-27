import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { messageReceived } from '../../redux/feature/messageSlice';
import { resetAuthToken } from '../../utils/authUtils';
import MessageList from '../../component/MessageList';
import './index.css';

const Chat: FC<{
	client: any;
}> = ({ client }) => {
	const [currentMessage, setCurrentMessage] = useState('');
	const dispatch = useAppDispatch();
	const { userName } = useAppSelector((state) => state.user);
	const sendMessage = () => {
		if (currentMessage !== '') {
			const messageData = {
				author: userName,
				message: currentMessage,
				time:
					new Date(Date.now()).getHours() +
					':' +
					new Date(Date.now()).getMinutes(),
			};
			// console.log(messageData);
			client.send(JSON.stringify({ type: 'send-message', messageData }));
		}
		setCurrentMessage('');
	};

	React.useEffect(() => {
		client.onmessage = (message: any) => {
			console.log(message);
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
