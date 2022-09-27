import { createSlice } from '@reduxjs/toolkit';

export interface PayloadType {
	id?: number;
	message: string;
	author: string;
	time: string;
}

type InitialState = {
	messages: PayloadType[];
};

const initialState: InitialState = {
	messages: [],
};

export const message = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		messageReceived: (state: InitialState, { payload }) => {
			state.messages = [
				...state.messages,
				{
					message: payload.message,
					author: payload.author,
					time: payload.time,
				},
			];
		},
	},
});

export const { messageReceived } = message.actions;

export default message.reducer;
