import classes from './AuthForm.module.css';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	login,
	changeTryToAddSthValue,
	setAdmin,
} from '../../store/Slices/authSlice';
import { authInfo } from '../../store/store';
import { useRouter } from 'next/router';
import { setCart } from '../../store/Slices/cartSlice';
import { setFavorites } from '../../store/Slices/favoriteSlice';

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
	const dispatch = useDispatch();
	const authData = useSelector(authInfo);
	const router = useRouter();

	const emailInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);

	const onChangeEmail = () => {
		setEnteredEmail(emailInput.current!.value);
		setIsTouchedEmail(true);
	};

	const onChangePassword = () => {
		setEnteredPassword(passwordInput.current!.value);
		setIsTouchedPassword(true);
	};

	const switchHandler = () => {
		setIsLogin(!isLogin);
	};

	const submissionHandler = (event: React.FormEvent) => {
		event.preventDefault();
		setIsEmailValid(enteredEmail.includes('@'));
		setIsPasswordValid(enteredPassword.trim().length > 6);

		if (
			enteredEmail.includes('@') === true &&
			enteredPassword.trim().length > 6
		) {
			//login
			let url = '';
			if (isLogin) {
				url =
					'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4CeSe6H1d5ZNjzB_gqTz88JZ9MQbKJPU';
			} else {
				url =
					'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4CeSe6H1d5ZNjzB_gqTz88JZ9MQbKJPU';
			}
			fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken: true,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						return response.json().then((data) => {
							let errorMessage = data.error.message;
							throw new Error(errorMessage);
						});
					}
				})
				.then((data) => {
					dispatch(changeTryToAddSthValue(false));
					dispatch(login(data.localId));
					router.push('/');
					const cart = props.carts.find((cart) => cart.id === data.localId);
					dispatch(setCart(cart?.cart));
					const favorites = props.favorites.find(
						(favorite) => favorite.id === data.localId
					);
					console.log(favorites);
					dispatch(setFavorites(favorites?.favorites));
					if (data.localId === 'GZZ23nXcQTVdWBunP2zYX1zhoXF3') {
						dispatch(setAdmin(true));
					}
				})
				.catch((err) => {
					alert(err.message);
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
