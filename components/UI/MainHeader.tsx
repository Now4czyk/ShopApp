import classes from './_MainHeader.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
	authInfo,
	cartInfo,
	favoritesInfo,
	underlinedNavInfo,
} from '../../store/store';
import { logout, setAdmin } from '../../store/Slices/authSlice';
import { clearCart } from '../../store/Slices/cartSlice';
import { clearFavorites } from '../../store/Slices/favoriteSlice';
import { setNav, setNavsStates } from '../../store/Slices/underlinedNavSlice';

const MainHeader = () => {
	const [counterIsHighlighted, setCounterIsHighlighted] = useState(false);
	const [favoritesIsHighlighted, setFavoritesIsHighlighted] = useState(false);
	const dispatch = useDispatch();
	const authData = useSelector(authInfo);
	const cartData = useSelector(cartInfo);
	const favoritesData = useSelector(favoritesInfo);
	const underlinedNavData = useSelector(underlinedNavInfo);
	const router = useRouter();
	const cartActive = underlinedNavData.find(
		(nav) => nav.navName === 'cart'
	)!.isActive;
	const favoritesActive = underlinedNavData.find(
		(nav) => nav.navName === 'favorites'
	)!.isActive;
	const loginActive = underlinedNavData.find(
		(nav) => nav.navName === 'login'
	)!.isActive;
	const modifyActive = underlinedNavData.find(
		(nav) => nav.navName === 'modify'
	)!.isActive;
	const userPerspectiveActive = underlinedNavData.find(
		(nav) => nav.navName === 'userPerspective'
	)!.isActive;

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
		dispatch(setNavsStates(false));
		dispatch(setNav({ navName: 'userPerspective', isActive: true }));
		router.push('./');
	};
	const modifyHandler = () => {
		dispatch(setNavsStates(false));
		dispatch(setNav({ navName: 'modify', isActive: true }));
		router.push('./modification');
	};
	const cartHandler = () => {
		dispatch(setNavsStates(false));
		dispatch(setNav({ navName: 'cart', isActive: true }));
		router.push('/cart');
	};
	const favoritesHandler = () => {
		dispatch(setNavsStates(false));
		dispatch(setNav({ navName: 'favorites', isActive: true }));
		router.push('./favorites');
	};
	const titleHandler = () => {
		dispatch(setNavsStates(false));
		dispatch(setNav({ navName: 'userPerspective', isActive: true }));
		router.push('/');
	};
	const loginHandler = () => {
		dispatch(setNavsStates(false));
		dispatch(setNav({ navName: 'login', isActive: true }));
		router.push('/auth');
	};
	const logoutHandler = () => {
		dispatch(setNavsStates(false));
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
					cartActive
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
					favoritesActive
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
											userPerspectiveActive
												? `${classes.userPerspective} ${classes.active}`
												: `${classes.userPerspective} ${classes.animation}`
										}>
										User Perspective
									</li>
									<li
										className={
											modifyActive ? classes.active : classes.animation
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
								className={loginActive ? classes.active : classes.animation}
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
