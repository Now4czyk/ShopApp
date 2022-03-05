import { availableProductsInfo, authInfo } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import classes from './ProductDetails.module.css';
import { useState } from 'react';
import { addToCart } from '../../store/Slices/cartSlice';
import { changeTryToAddSthValue } from '../../store/Slices/authSlice';
import { useRouter } from 'next/router';
import { favoritesInfo } from '../../store/store';
import {
	addToFavorites,
	removeFromFavorites,
} from '../../store/Slices/favoriteSlice';
import { cartInfo } from '../../store/store';

const ProductDetails: React.FC<{ id: string }> = (props) => {
	const [quantityInput, setQuantityInput] = useState(1);
	const [sizeInput, setSizeInput] = useState('S');
	const [maxQuantity, setMaxQuantity] = useState(false);
	const availableProductsData = useSelector(availableProductsInfo);
	const favoritesData = useSelector(favoritesInfo);
	const authData = useSelector(authInfo);
	const cartData = useSelector(cartInfo);
	const dispatch = useDispatch();
	const router = useRouter();

	const quantity = cartData.reduce((sum, product) => {
		return sum + product.quantity;
	}, 0);

	const choosenProduct = availableProductsData.find((product) => {
		return product.id === props.id;
	});
	//fix the problem (the underlined values are never equal to undefined)
	const { url, title, price, id } = choosenProduct;

	const isFavorite = favoritesData.find((product) => product.id === props.id);
	const product = {
		url,
		title,
		price,
		id,
	};

	const addToFavoritesHandler = () => {
		dispatch(addToFavorites(product));
	};

	const removeFromFavoritesHandler = () => {
		dispatch(removeFromFavorites(product));
	};

	const sizeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSizeInput(event.target.value);
	};

	const quantityHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuantityInput(parseInt(event.target.value));
	};

	const submissionHandler = (event: React.FormEvent) => {
		event.preventDefault();
		if (authData.isLoggedIn && quantity + quantityInput < 1000) {
			console.log('ordering....');
			const data = {
				url,
				title,
				price,
				id,
				key: id,
				quantity: quantityInput,
				size: sizeInput,
			};
			dispatch(addToCart(data));
			setMaxQuantity(false);
		} else if (authData.isLoggedIn && quantity + quantityInput >= 1000) {
			setMaxQuantity(true);
		} else {
			dispatch(changeTryToAddSthValue(true));
			router.push('/auth');
			setMaxQuantity(false);
		}
	};

	return (
		<div className={classes.container}>
			<img className={classes.img} src={url} />
			<div className={classes.data}>
				<div className={classes.title}>{title}</div>
				<div className={classes.price}>{`$${price}`}</div>
				<div className={classes.id}>{`ID: ${id}`}</div>
				<form onSubmit={submissionHandler}>
					<label htmlFor='size'>Size: </label>
					<select
						onChange={sizeHandler}
						defaultValue='S'
						id='size'
						className={classes.size}>
						<option value='S'>S</option>
						<option value='M'>M</option>
						<option value='L'>L</option>
						<option value='XL'>XL</option>
					</select>
					<label htmlFor='Quantity'>Quantity: </label>
					<input
						onChange={quantityHandler}
						value={quantityInput}
						type='number'
						min={1}
						step={1}
						className={classes.quantity}
					/>
					<div className={classes.actions}>
						<button className={classes.addButton}>Add to cart</button>
						{!isFavorite && (
							<img
								onClick={addToFavoritesHandler}
								className={classes.favorite}
								src='https://cdn.iconscout.com/icon/free/png-256/heart-favourite-favorite-love-like-outline-interface-4-14712.png'></img>
						)}
						{isFavorite && (
							<img
								onClick={removeFromFavoritesHandler}
								className={classes.favorite}
								src='https://user-images.githubusercontent.com/29887220/113503333-7e4f6280-9531-11eb-8fcd-cd5f2b1903b1.png'></img>
						)}
					</div>
					{maxQuantity && <p className={classes.maxQuantity}>Max quantity in Cart: 1000</p>}
				</form>
			</div>
		</div>
	);
};

export default ProductDetails;
