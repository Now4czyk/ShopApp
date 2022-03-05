import { createSlice, current } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export type data = {
	url: string;
	title: string;
	price: number;
	id: string;
	key: string;
	quantity: number;
	size: string;
};

interface initialValues {
	data: data[];
}

const initialState: initialValues = {
	data: [],
};

export const cartSlice = createSlice({
	name: 'cartSlice',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<data>) {
			const sameIdProducts = state.data.filter(
				(product) => product.id === action.payload.id
			);

			if (sameIdProducts.length > 0) {
				const sameSizeProduct = sameIdProducts.filter(
					(product) => product.size === action.payload.size
				);
				if (sameSizeProduct.length > 0) {
					const index = state.data.findIndex(
						(product) =>
							product.id === action.payload.id &&
							product.size === action.payload.size
					);
					state.data[index].quantity += action.payload.quantity;
				} else {
					state.data.push(action.payload);
				}
			} else {
				state.data.push(action.payload);
			}
			// console.log(current(state.data));
		},
		removeFromCart(state, action: PayloadAction<data>) {
			const index = state.data.findIndex(
				(product) =>
					product.id === action.payload.id &&
					product.size === action.payload.size
			);

			if (state.data[index].quantity > 1) {
				state.data[index].quantity -= 1;
			} else {
				state.data.splice(index, 1);
			}
		},
		clearCart(state) {
			state.data = [];
		},
		setCart(state, action: PayloadAction<data[] | undefined>) {
			if (action.payload !== undefined) {
				state.data = action.payload;
			}
		},
	},
});

export const cartReducer = cartSlice.reducer;

export const { addToCart, removeFromCart, clearCart, setCart } =
	cartSlice.actions;
