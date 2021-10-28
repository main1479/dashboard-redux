import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		userInfo: {
			name: 'Mainul',
			email: 'm.main2402@gmail.com',
			image: 'https://avatars.githubusercontent.com/u/57148171?v=4',
		},
		loading: null,
		error: false,
	},
	reducers: {
		updateStart: (state) => {
			state.loading = true;
		},
		update: (state, action) => {
			state.userInfo = { ...action.payload };
			state.loading = false;
		},
		updateError: (state) => {
			state.loading = null;
			state.error = true;
		},
		removeUser: (state) => {
			state.loading = null;
			state.error = false;
			state.userInfo = {};
		},
	},
});

// api Endpoint https://randomuser.me/api/?inc=name,email,picture

export const update = async (dispatch, userInfo) => {
	try {
		dispatch(userSlice.actions.updateStart());
		const { data } = await axios.get('https://randomuser.me/api/?inc=name,email,picture');
		const { name, email, picture } = data.results[0];
		const user = {
			email,
			name: name.first,
			image: picture.large,
		};
		if (userInfo) {
			dispatch(userSlice.actions.update(userInfo));
		} else {
			dispatch(userSlice.actions.update(user));
		}
	} catch (err) {
		dispatch(userSlice.actions.updateError());
	}
};

export const { removeUser } = userSlice.actions;
export default userSlice.reducer;
