import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hook';
import { createUser } from '../../redux/feature/userSlice';
import { setAuthState } from '../../utils/authUtils';
import './index.css';

const LoginForm = () => {
	const [name, setName] = useState('');
	let dispatch = useAppDispatch();
	const { userName } = useAppSelector((state) => state.user);
	let navigate = useNavigate();
	const changeHandler = (e: any) => {
		setName(e.target.value);
		dispatch(createUser({ name: e.target.value }));
	};
	const joinRoom = () => {
		if (name !== '') {
			setAuthState(userName);
		}
		navigate('/chat');
		setName('');
	};
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
			<button onClick={joinRoom}>Join A Room</button>
		</div>
	);
};

export default LoginForm;
