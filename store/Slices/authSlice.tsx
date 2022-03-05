import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

type data = {
	localId: string;
	isAdmin: boolean;
	isLoggedIn: boolean;
	tryToAddSthBeingLoggedOut: boolean;
};

interface initialValues {
	data: data;
}

const initialState: initialValues = {
	data: {
		localId: '',
		isLoggedIn: false,
		isAdmin: false,
		tryToAddSthBeingLoggedOut: false,
	},
};

export const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<string>) => {
			state.data.isLoggedIn = true;
			state.data.localId = action.payload;
		},
		logout: (state) => {
			state.data.isLoggedIn = false;
			state.data.localId = '';
		},
		changeTryToAddSthValue(state, action: PayloadAction<boolean>) {
			state.data.tryToAddSthBeingLoggedOut = action.payload;
		},
		setAdmin(state, action: PayloadAction<boolean>) {
			state.data.isAdmin = action.payload;
		},
	},
});

export const authReducer = authSlice.reducer;

export const { login, logout, changeTryToAddSthValue, setAdmin } = authSlice.actions;
