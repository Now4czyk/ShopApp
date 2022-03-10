import classes from './_MainHeader.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authInfo, cartInfo, favoritesInfo } from '../../store/store';
import {
	changeTryToAddSthValue,
	logout,
	setAdmin,
} from '../../store/Slices/authSlice';
import { clearCart } from '../../store/Slices/cartSlice';
import { clearFavorites } from '../../store/Slices/favoriteSlice';

const MainHeader = () => {
	const [isCartActive, setIsCartActive] = useState(false);
	const [isFavoritesActive, setIsFavoritesActive] = useState(false);
	const [isLoginActive, setIsLoginActive] = useState(false);
	const [isModifyActive, setIsModifyActive] = useState(false);
	const [isUserPerspectiveActive, setIsUserPerspectiveActive] = useState(true);
	const [counterIsHighlighted, setCounterIsHighlighted] = useState(false);
	const [favoritesIsHighlighted, setFavoritesIsHighlighted] = useState(false);
	const dispatch = useDispatch();
	const authData = useSelector(authInfo);
	const cartData = useSelector(cartInfo);
	const favoritesData = useSelector(favoritesInfo);
	const router = useRouter();

	//handling data from Slices
	const cartCounter = cartData.reduce((curNumber, item) => {
		return curNumber + item.quantity;
	}, 0);
	const favoriteCounter = favoritesData.length;

	//handling counter animations
	useEffect(() => {
		console.log(cartCounter);
		if (cartCounter === 0) {
			return;
		}
		setCounterIsHighlighted(true);

		const timerCounter = setTimeout(() => {
			setCounterIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timerCounter);
		};
	}, [cartCounter]);
	useEffect(() => {
		console.log(favoriteCounter);
		if (favoriteCounter === 0) {
			return;
		}
		setFavoritesIsHighlighted(true);

		const timerFavorite = setTimeout(() => {
			setFavoritesIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timerFavorite);
		};
	}, [favoriteCounter]);

	//handling underline animations
	const userPerspectiveHandler = () => {
		setIsModifyActive(false);
		setIsUserPerspectiveActive(true);
		router.push('./');
	};
	const modifyHandler = () => {
		setIsModifyActive(true);
		setIsUserPerspectiveActive(false);
		router.push('./modification');
	};
	const cartHandler = () => {
		setIsCartActive(true);
		setIsLoginActive(false);
		setIsFavoritesActive(false);
		router.push('/cart');
	};
	const favoritesHandler = () => {
		setIsCartActive(false);
		setIsLoginActive(false);
		setIsFavoritesActive(true);
		router.push('./favorites');
	};
	const titleHandler = () => {
		setIsCartActive(false);
		setIsLoginActive(false);
		setIsFavoritesActive(false);
		setIsModifyActive(false);
		setIsUserPerspectiveActive(false);
		router.push('/');
	};
	const loginHandler = () => {
		setIsCartActive(false);
		setIsLoginActive(true);
		setIsFavoritesActive(false);
		setIsModifyActive(false);
		setIsUserPerspectiveActive(false);
		dispatch(changeTryToAddSthValue(false));
		router.push('/auth');
	};
	const logoutHandler = () => {
		setIsCartActive(false);
		setIsLoginActive(false);
		setIsFavoritesActive(false);
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

	//handling li items with counters
	const LiCart = () => {
		return (
			<li
				onClick={cartHandler}
				className={
					isCartActive
						? `${classes.liCart} ${classes.active}`
						: `${classes.liCart} ${classes.animation}`
				}>
				Cart
				<span
					className={
						counterIsHighlighted
							? `${classes.counter} ${classes.bump}`
							: `${classes.counter}`
					}>
					{cartCounter}
				</span>
			</li>
		);
	};
	const LiFavorites = () => {
		return (
			<li
				onClick={favoritesHandler}
				className={
					isFavoritesActive
						? `${classes.liCart} ${classes.active}`
						: `${classes.liCart} ${classes.animation}`
				}>
				Favorites
				<span
					className={
						favoritesIsHighlighted
							? `${classes.counter} ${classes.bump}`
							: `${classes.counter}`
					}>
					{favoriteCounter}
				</span>
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
										className={
											isUserPerspectiveActive
												? `${classes.userPerspective} ${classes.active}`
												: `${classes.userPerspective} ${classes.animation}`
										}>
										User Perspective
									</li>
									<li
										className={
											isModifyActive ? classes.active : classes.animation
										}
										onClick={modifyHandler}>
										Modify
									</li>
								</>
							) : (
								<>
									<LiCart />
									<LiFavorites />
								</>
							)}
							<li className={classes.animation} onClick={logoutHandler}>
								Logout
							</li>
						</>
					)}
					{!authData.isLoggedIn && (
						<>
							<LiCart />
							<li
								className={isLoginActive ? classes.active : classes.animation}
								onClick={loginHandler}>
								Login
							</li>
						</>
					)}
				</ul>
			</div>
		</header>
	);
};

export default MainHeader;
