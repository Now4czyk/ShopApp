import classes from './MainHeader.module.css';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setAdmin } from '../../store/Slices/authSlice';
import { changeTryToAddSthValue } from '../../store/Slices/authSlice';
import { clearCart } from '../../store/Slices/cartSlice';
import { authInfo, cartInfo, favoritesInfo } from '../../store/store';
import { clearFavorites } from '../../store/Slices/favoriteSlice';
import axios from 'axios';

const MainHeader = () => {
	const authData = useSelector(authInfo);
	const cartData = useSelector(cartInfo);
	const favoritesData = useSelector(favoritesInfo);
	const router = useRouter();
	const dispatch = useDispatch();

	const cartCounter = cartData.reduce((curNumber, item) => {
		return curNumber + item.quantity;
	}, 0);

	const favoriteCounter = favoritesData.length;

	const titleHandler = () => {
		router.push('/');
	};
	const loginHandler = () => {
		dispatch(changeTryToAddSthValue(false));
		router.push('/auth');
	};
	const logoutHandler = () => {
		dispatch(logout());
		dispatch(setAdmin(false));
		router.push('/');

		axios
			.post('/api/update-user-cart', {
				id: authData.localId,
				cartData: cartData,
			})
			.then(() => {
				dispatch(clearCart());
			})
			.catch((error) => {
				alert(error.response.statusText);
			});

		axios
			.post('/api/update-user-favorites', {
				id: authData.localId,
				favoritesData: favoritesData,
			})
			.then(() => {
				dispatch(clearFavorites());
			})
			.catch((error) => {
				alert(error.response.statusText);
			});
	};
	const cartHandler = () => {
		router.push('/cart');
	};
	const favoritesHandler = () => {
		router.push('./favorites');
	};
	const userPerspectiveHandler = () => {
		router.push('./');
	};
	const modifyHandler = () => {
		router.push('./modification');
	};

	const LiCart = () => {
		return (
			<li onClick={cartHandler} className={classes.liCart}>
				Cart<span className={classes.counter}>{cartCounter}</span>
			</li>
		);
	};

	const LiFavorites = () => {
		return (
			<li onClick={favoritesHandler} className={classes.liFavorites}>
				Favorites<span className={classes.counter}>{favoriteCounter}</span>
			</li>
		);
	};

	return (
		<header className={classes.header}>
			<div className={classes.title} onClick={titleHandler}>
				ReactShop
			</div>
			<div className={classes.actions}>
				<ul className={classes.ul}>
					{authData.isLoggedIn && (
						<>
							{authData.isAdmin ? (
								<>
									<li
										onClick={userPerspectiveHandler}
										className={classes.usePerspective}>
										User Perspective
									</li>
									<li onClick={modifyHandler}>Modify</li>
								</>
							) : (
								<>
									<LiCart />
									<LiFavorites />
								</>
							)}
							<li onClick={logoutHandler}>Logout</li>
						</>
					)}
					{!authData.isLoggedIn && (
						<>
							<LiCart />
							<li onClick={loginHandler}>Login</li>
						</>
					)}
				</ul>
			</div>
		</header>
	);
};

export default MainHeader;
