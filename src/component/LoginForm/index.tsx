import React, { FC, useState } from 'react';
import './index.css';

const LoginForm = () => {
	const [name, setName] = useState('');
	const changeHandler = (e: any) => {
		setName(e.target.value);
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
					if (event.key === 'Enter') console.log('Clicked');
				}}
			/>
			<button
				onClick={() => {
					setName('');
				}}
			>
				Join A Room
			</button>
		</div>
	);
};

export default LoginForm;
