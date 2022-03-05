import classes from './Product.module.css';
import { useRouter } from 'next/router';
import { favoritesInfo } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
	addToFavorites,
	removeFromFavorites,
} from '../../store/Slices/favoriteSlice';
import { authInfo } from '../../store/store';
import { changeTryToAddSthValue } from '../../store/Slices/authSlice';

const Product: React.FC<{
	url: string;
	title: string;
	price: number;
	id: string;
}> = (props) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const authData = useSelector(authInfo);
	const favoritesData = useSelector(favoritesInfo);
	const isFavorite = favoritesData.find((product) => product.id === props.id);
	const product = {
		url: props.url,
		title: props.title,
		price: props.price,
		id: props.id,
	};

	const addToFavoritesHandler = () => {
		if (authData.isLoggedIn) {
			dispatch(addToFavorites(product));
		} else {
			router.push('./auth');
			dispatch(changeTryToAddSthValue(true));
		}
	};

	const removeFromFavoritesHandler = () => {
		if (authData.isLoggedIn) {
			dispatch(removeFromFavorites(product));
		} else {
			router.push('./auth');
			dispatch(changeTryToAddSthValue(true));
		}
	};

	const goToDetailsHandler = () => {
		console.log(`In component Product`);
		router.push(`/${props.id}`);
	};
	return (
		<div className={classes.product}>
			<p className={classes.title}>
				{props.title}
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
			</p>
			<img
				className={classes.productImg}
				onClick={goToDetailsHandler}
				src={props.url}
			/>
			<p className={classes.price}>{`$${props.price}`}</p>
		</div>
	);
};

export default Product;
