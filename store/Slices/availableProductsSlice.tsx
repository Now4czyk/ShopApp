import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

type data = {
	url: string;
	title: string;
	price: number;
	key: string;
	id: string;
	blockade: boolean;
};

type initialValues = {
	data: data[];
}

const initialState: initialValues = {
	data: [],
};

export const availableProductsSlice = createSlice({
	name: 'availableProductsSlice',
	initialState,
	reducers: {
		setAvailableProducts: (state, action: PayloadAction<any>) => {
			state.data = action.payload;
		},
	},
});

export const availableProductsReducer = availableProductsSlice.reducer;

export const { setAvailableProducts } = availableProductsSlice.actions;
