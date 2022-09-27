import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../hook';
import { createUser } from '../../redux/feature/userSlice';
import './index.css';

const LoginForm: FC<{ joinRoom: Function }> = ({ joinRoom }) => {
	const [name, setName] = useState('');
	let dispatch = useAppDispatch();
	const changeHandler = (e: any) => {
		setName(e.target.value);
		dispatch(createUser({ name: e.target.value }));
	};
	// const joinRoom = () => {
	// 	if (name !== '') {
	// 		setAuthState(userName);
	// 	}
	// 	navigate('/chat');
	// 	setName('');
	// };
	return (
		<div className='joinChatContainer'>
			<h3>Join A Chat</h3>
			<input
				type='text'
				placeholder='Enter your name'
				value={name}
				onChange={changeHandler}
				onKeyDown={(event) => {
					if (event.key === 'Enter') joinRoom();
				}}
			/>
			<button
				onClick={() => {
					joinRoom();
					setName('');
				}}
			>
				Join A Room
			</button>
		</div>
	);
};

export default LoginForm;
