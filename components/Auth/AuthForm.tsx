import classes from './_AuthForm.module.scss';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {
	authInfo,
	availableProductsInfo,
	cartLoggedOutInfo,
} from '../../store/store';
import {
	changeTryToAddSthValue,
	login,
	setAdmin,
} from '../../store/Slices/authSlice';
import { setFavorites } from '../../store/Slices/favoriteSlice';
import {
	addToCart,
	setCart,
	setCartLoggedOut,
} from '../../store/Slices/cartSlice';
import { setNav, setNavsStates } from '../../store/Slices/underlinedNavSlice';

type cartData = {
	url: string;
	title: string;
	price: number;
	id: string;
	key: string;
	quantity: number;
	size: string;
};

type favoritesData = {
	id: string;
	url: string;
	title: string;
	price: number;
};

type availableProductsData = {
	url: string;
	title: string;
	price: number;
	key: string;
	id: string;
	blockade: boolean;
};

//start function
const checkForAdminChanges = (
	dispatch: Dispatch<any>,
	elements: any,
	data: any,
	availableProductsData: availableProductsData[],
	setElements: (payload: any) => void,
	isCart: boolean
) => {
	let element = elements.find(
		(
			element:
				| {
						id: string;
						cart: cartData[];
				  }
				| {
						id: string;
						favorites: favoritesData[];
				  }
		) => element.id === data.localId
	);
	let array;
	if (isCart) {
		array = element?.cart;
	} else {
		array = element?.favorites;
	}
	array.forEach((position: cartData | favoritesData) => {
		const productFromDB = availableProductsData.find(
			(product) => product.id === position.id
		);
		if (productFromDB !== undefined) {
			if (position.title !== productFromDB!.title)
				position.title = productFromDB!.title;
			if (position.price !== productFromDB!.price)
				position.price = productFromDB!.price;
			if (position.url !== productFromDB!.url)
				position.url = productFromDB!.url;
		}
	});
	dispatch(
		setElements(
			array.filter((position: cartData | favoritesData) => {
				const index = availableProductsData.find(
					(product) => product.id === position.id
				);
				return availableProductsData.find(
					(product) => product.id === position.id
				);
			})
		)
	);
};

//finish function

const AuthForm: React.FC<{
	carts: { id: string; cart: cartData[] }[];
	favorites: { id: string; favorites: favoritesData[] }[];
}> = (props) => {
	const [isTouchedEmail, setIsTouchedEmail] = useState(false);
	const [isTouchedPassword, setIsTouchedPassword] = useState(false);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredPassword, setEnteredPassword] = useState('');
	const [isLogin, setIsLogin] = useState(true);
	const [isAuthError, setIsAuthError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();
	const authData = useSelector(authInfo);
	const availableProductsData = useSelector(availableProductsInfo);
	const cartLoggedOutData = useSelector(cartLoggedOutInfo);
	const router = useRouter();

	//switch a state of being logged in
	const switchHandler = () => {
		setIsLogin(!isLogin);
	};

	//handling inputs
	const onChangeEmail = () => {
		setEnteredEmail(emailInput.current!.value);
		setIsTouchedEmail(true);
	};
	const onChangePassword = () => {
		setEnteredPassword(passwordInput.current!.value);
		setIsTouchedPassword(true);
	};

	//handling form submission
	const submissionHandler = (event: React.FormEvent) => {
		event.preventDefault();
		setIsAuthError(false);
		setIsEmailValid(enteredEmail.includes('@'));
		setIsPasswordValid(enteredPassword.trim().length > 6);
		if (
			enteredEmail.includes('@') === true &&
			enteredPassword.trim().length > 6
		) {
			let url = '';
			if (isLogin) {
				url =
					'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4CeSe6H1d5ZNjzB_gqTz88JZ9MQbKJPU';
			} else {
				url =
					'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4CeSe6H1d5ZNjzB_gqTz88JZ9MQbKJPU';
			}

			axios
				.post(url, {
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken: true,
				})
				//handling success
				.then((response) => {
					const data = response.data;
					dispatch(login(data.localId));
					//checking cart and favorites whether admin changed values of products
					checkForAdminChanges(
						dispatch,
						props.carts,
						data,
						availableProductsData,
						setCart,
						true
					);
					checkForAdminChanges(
						dispatch,
						props.favorites,
						data,
						availableProductsData,
						setFavorites,
						false
					);
					if (authData.tryToAddSthBeingLoggedOut) {
						dispatch(addToCart(cartLoggedOutData));
						dispatch(changeTryToAddSthValue(false));
						dispatch(
							setCartLoggedOut({
								url: '',
								title: '',
								price: 0,
								id: '',
								key: '',
								quantity: 0,
								size: '',
							})
						);
					}
					if (data.localId === 'GZZ23nXcQTVdWBunP2zYX1zhoXF3') {
						dispatch(setAdmin(true));
					}
					dispatch(setNavsStates(false));
					dispatch(setNav({ navName: 'userPerspective', isActive: true }));
					router.push('/');
				})
				//handling error
				.catch((error) => {
					setIsAuthError(true);
					setErrorMessage(error.response);
				});
		}
	};

	return (
		<section className={classes.auth}>
			<form onSubmit={submissionHandler} className={classes.form}>
				<h1 className={classes.title}>{isLogin ? 'Sign-In' : 'Sign-Up'}</h1>
				{authData.tryToAddSthBeingLoggedOut && (
					<p className={classes.warning}>
						In order to add a product to Cart, you need to sign-in/sign-up
					</p>
				)}
				<label htmlFor='email'>Email: </label>
				<input
					ref={emailInput}
					onChange={onChangeEmail}
					type='text'
					id='email'
					className={!isEmailValid && isTouchedEmail ? classes.invalid : ''}
				/>
				{!isEmailValid && isTouchedEmail ? (
					<p className={classes.errorMessage}>Invalid email: must include @</p>
				) : (
					''
				)}
				<label htmlFor='password'>Password: </label>
				<input
					ref={passwordInput}
					onChange={onChangePassword}
					type='password'
					id='password'
					className={
						!isPasswordValid && isTouchedPassword ? classes.invalid : ''
					}
				/>
				{!isPasswordValid && isTouchedPassword ? (
					<p className={classes.errorMessage}>
						Invalid password: length {'>'} 6
					</p>
				) : (
					''
				)}
				{isAuthError && <p className={classes.errorMessage}>{errorMessage}</p>}
				<button type='submit' className={classes.btnSubmit}>
					Continue
				</button>
			</form>
			<p className={classes.alternative}>
				{isLogin ? 'New customer? ' : 'Already have an account? '}
				<button
					type='button'
					onClick={switchHandler}
					className={classes.btnSwitch}>
					{isLogin ? 'Start here' : 'Sign-In'}
				</button>
			</p>
		</section>
	);
};

export default AuthForm;
