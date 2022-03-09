import classes from './_CartList.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { cartInfo } from '../../store/store';
import CartItem from './CartItem';
import CartForm from './CartForm';

const CartList = () => {
	const router = useRouter();
	const [isOrderClicked, setIsOrderClicked] = useState(false);
	const [maxQuantity, setMaxQuantity] = useState(false);
	const cartData = useSelector(cartInfo);

	const quantity = cartData.reduce((curNum, product) => {
		return curNum + product.quantity;
	}, 0);

	const price = cartData.reduce((curNumber, product) => {
		return curNumber + product.price * product.quantity;
	}, 0);

	const continueShoppingHandler = () => {
		router.push('/');
	};

	const orderHandler = () => {
		if (quantity !== 0) {
			setIsOrderClicked(!isOrderClicked);
		}
	};

	return (
		<div className={classes.list}>
			{cartData.map((product) => (
				<CartItem
					setMaxQuantity={setMaxQuantity}
					key={Math.random().toString()}
					product={product}
				/>
			))}
			{!cartData.length && (
				<p className={classes.noProducts}>There are no products in your cart</p>
			)}

			<div className={classes.summary}>
				<div className={classes.title}>Total Amount</div>
				<div className={classes.amount}>${price.toFixed(2)}</div>
			</div>
			{maxQuantity && (
				<p className={classes.maxQuantity}>Max quantity in Cart: 1000</p>
			)}
			<div className={classes.actions}>
				{!isOrderClicked && (
					<>
						<button onClick={continueShoppingHandler}>Continue shopping</button>
						<button
							onClick={orderHandler}
							className={quantity === 0 ? classes.isEmpty : ''}>
							Order
						</button>
					</>
				)}
			</div>

			{isOrderClicked && <CartForm onClickCancel={orderHandler} />}
		</div>
	);
};

export default CartList;
