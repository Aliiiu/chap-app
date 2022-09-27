import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
	userName: string;
}
const initialState: InitialState = {
	userName: '',
};
export const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		createUser: (state: InitialState, { payload }) => {
			state.userName = payload.name;
		},
	},
});

export default user.reducer;

export const { createUser } = user.actions;
