import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export type data = {
	url: string;
	title: string;
	price: number;
	id: string;
};

interface initialValues {
	data: data[];
}

const initialState: initialValues = {
	data: [],
};

export const favoriteSlice = createSlice({
	name: 'favoriteSlice',
	initialState,
	reducers: {
		addToFavorites(state, action: PayloadAction<data>) {
			state.data.push(action.payload);
		},
		removeFromFavorites(state, action: PayloadAction<data>) {
			state.data = state.data.filter(
				(product) => product.id !== action.payload.id
			);
		},
		clearFavorites(state) {
			state.data = [];
		},
		setFavorites(state, action: PayloadAction<data[] | undefined>) {
			if (action.payload !== undefined) {
				state.data = action.payload;
			}
		},
	},
});

export const favoriteReducer = favoriteSlice.reducer;

export const {
	addToFavorites,
	removeFromFavorites,
	clearFavorites,
	setFavorites,
} = favoriteSlice.actions;
