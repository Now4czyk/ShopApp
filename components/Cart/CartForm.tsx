import classes from './_CartForm.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { cartInfo } from '../../store/store';
import { clearCart } from '../../store/Slices/cartSlice';

const CartForm: React.FC<{ onClickCancel: () => void }> = (props) => {
	const [enteredName, setEnteredName] = useState('');
	const [enteredStreet, setEnteredStreet] = useState('');
	const [enteredPostalCode, setEnteredPostalCode] = useState('');
	const [enteredCity, setEnteredCity] = useState('');
	const [isValidName, setIsValidName] = useState(false);
	const [isValidStreet, setIsValidStreet] = useState(false);
	const [isValidPostalCode, setIsValidPostalCode] = useState(false);
	const [isValidCity, setIsValidCity] = useState(false);
	const [isSubmittedForm, setIsSubmittedForm] = useState(false);
	const cartData = useSelector(cartInfo);
	const router = useRouter();
	const dispatch = useDispatch();

	const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredName(event.target.value);
		setIsValidName(
			event.target.value.length > 0 && /^[a-zA-Z]+$/.test(event.target.value)
		);
	};
	const streetHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredStreet(event.target.value);
		setIsValidStreet(event.target.value.length > 0);
	};
	const postalCodeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredPostalCode(event.target.value);
		setIsValidPostalCode(
			event.target.value.replace(/ /g, '').length === 5 &&
				/^(?=.*\d)[\d ]+$/.test(event.target.value)
		);
	};
	const cityHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredCity(event.target.value);
		setIsValidCity(
			event.target.value.length > 0 && /^[a-zA-Z]+$/.test(event.target.value)
		);
	};

	const submissionHandler = (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmittedForm(true);

		const data = {
			clothes: cartData.map((element) => {
				return {
					title: element.title,
					price: element.price,
					quantity: element.quantity,
					size: element.size,
					id: element.id,
				};
			}),
			name: enteredName,
			street: enteredStreet,
			postalCode: enteredPostalCode,
			city: enteredCity,
			totalPrice: `$${cartData.reduce((curPrice, element) => {
				return curPrice + element.quantity * element.price;
			}, 0)}`,
			time: `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`,
		};

		if (isValidName && isValidStreet && isValidPostalCode && isValidCity) {
			axios
				.post('/api/new-order', { order: data })
				.then(() => {
					router.push('/thanks');
					dispatch(clearCart());
				})
				.catch((error) => {
					alert(error.response.statusText);
				});
		}
	};
	return (
		<form className={classes.form}>
			<div className={classes.inputField}>
				<label htmlFor='name'>Your Name:</label>
				<input onChange={nameHandler} value={enteredName} id='name' />
				{!isValidName && isSubmittedForm && (
					<p className={classes.error}>Enter Valid Name</p>
				)}
			</div>
			<div className={classes.inputField}>
				<label htmlFor='street'>Street:</label>
				<input onChange={streetHandler} value={enteredStreet} id='street' />
				{!isValidStreet && isSubmittedForm && (
					<p className={classes.error}>Enter Valid Street</p>
				)}
			</div>
			<div className={classes.inputField}>
				<label htmlFor='postalCode'>Postal Code:</label>
				<input
					onChange={postalCodeHandler}
					value={enteredPostalCode}
					id='postalCode'
					type='text'
				/>
				{!isValidPostalCode && isSubmittedForm && (
					<p className={classes.error}>Enter Valid Postal Code</p>
				)}
			</div>
			<div className={classes.inputField}>
				<label htmlFor='city'>City:</label>
				<input onChange={cityHandler} value={enteredCity} id='city' />
				{!isValidCity && isSubmittedForm && (
					<p className={classes.error}>Enter Valid City</p>
				)}
			</div>
			<div className={classes.actions}>
				<button onClick={props.onClickCancel}>Cancel</button>

				<button
					className={
						!enteredName && !enteredCity && !enteredPostalCode && !enteredStreet
							? classes.isFormError
							: ''
					}
					onClick={submissionHandler}>
					Order
				</button>
			</div>
		</form>
	);
};

export default CartForm;
