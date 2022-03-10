import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

type data = {
	navName: string;
	isActive: boolean;
};

interface initialValues {
	data: data[];
}

const initialState: initialValues = {
	data: [
		{ navName: 'cart', isActive: false },
		{ navName: 'favorites', isActive: false },
		{ navName: 'login', isActive: false },
		{ navName: 'modify', isActive: false },
		{ navName: 'userPerspective', isActive: false },
	],
};

export const underlinedNavSlice = createSlice({
	name: 'underlinedNavSlice',
	initialState,
	reducers: {
		setNav(state, action: PayloadAction<data>) {
			const index = state.data.findIndex(
				(nav) => nav.navName === action.payload.navName
			);
			state.data[index].isActive = action.payload.isActive;
		},
		setNavsStates(state, action: PayloadAction<boolean>) {
			state.data.forEach((nav) => (nav.isActive = action.payload));
		},
	},
});

export const underlinedNavReducer = underlinedNavSlice.reducer;

export const { setNav, setNavsStates } = underlinedNavSlice.actions;
