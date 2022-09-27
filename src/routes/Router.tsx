import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { client } from '../App';
import Chat from '../pages/Chat';
import LoginForm from '../pages/LoginForm';
import { PrivateRoute } from './PrivateRoutes';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<LoginForm />} />
			<Route
				path='chat'
				element={
					<PrivateRoute>
						<Chat client={client} />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};

export default Router;
