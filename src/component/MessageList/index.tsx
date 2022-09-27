import ScrollToBottom from 'react-scroll-to-bottom';
import { useAppSelector } from '../../hook';
import { PayloadType } from '../../redux/feature/messageSlice';
import './index.css';

const MessageList = () => {
	const { messages } = useAppSelector((state) => state.message);
	const { userName } = useAppSelector((state) => state.user);
	return (
		<div className='chat-body'>
			<ScrollToBottom className='message-container'>
				{messages.map((item: PayloadType, idx: number) => (
					<div
						key={idx}
						className='message'
						id={userName === item.author ? 'you' : 'other'}
					>
						<div>
							<div className='message-content'>
								<p>{item.message}</p>
							</div>
							<div className='message-meta'>
								<p id='time'>{item.time}</p>
								<p id='author'>{item.author}</p>
							</div>
						</div>
					</div>
				))}
			</ScrollToBottom>
		</div>
	);
};

export default MessageList;
