import classes from './_CartItem.module.scss';
import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { authInfo, cartInfo } from '../../store/store';
import { data } from '../../store/Slices/cartSlice';
import {
	addToCart,
	removeOneFromCart,
	removePositionFromCart,
} from '../../store/Slices/cartSlice';

const CartItem: React.FC<{
	product: data;
	setMaxQuantity: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
	const dispatch = useDispatch();
	const authData = useSelector(authInfo);
	const cartData = useSelector(cartInfo);
	const router = useRouter();

	//handling data from a Cart
	const quantity = cartData.reduce((sum, product) => {
		return sum + product.quantity;
	}, 0);

	//handling buttons
	const addProductHandler = () => {
		if (!authData.isAdmin) {
			const { url, title, price, id, key, size } = props.product;
			const product = { url, title, price, id, key, quantity: 1, size };
			if (product.quantity + quantity < 1000) {
				dispatch(addToCart(product));
				props.setMaxQuantity(false);
			} else {
				props.setMaxQuantity(true);
			}
		}
	};
	const removeProductHandler = () => {
		dispatch(removeOneFromCart(props.product));
		props.setMaxQuantity(false);
	};
	const removePositionHandler = () => {
		dispatch(removePositionFromCart(props.product));
	};

	//handling redirection
	const redirectHandler = () => {
		router.push(`./${props.product.id}`);
	};
	
	return (
		<>
			<div className={classes.item}>
				<img
					className={classes.productImg}
					onClick={redirectHandler}
					src={props.product.url}
				/>
				<div className={classes.side}>
					<div className={classes.data}>
						<div onClick={redirectHandler} className={classes.title}>
							{props.product.title}
						</div>
						<span className={classes.id}>({props.product.id})</span>

						<div className={classes.priceAndQuantity}>
							${props.product.price}
							<span className={classes.quantity}>
								x{props.product.quantity}
							</span>
						</div>

						<div className={classes.size}>{props.product.size}</div>
					</div>
					<div className={classes.actions}>
						<button onClick={addProductHandler} className={classes.plus}>
							+
						</button>
						<button onClick={removeProductHandler} className={classes.minus}>
							-
						</button>
						<img
							onClick={removePositionHandler}
							className={classes.deleteImg}
							src='https://cdn.iconscout.com/icon/free/png-256/close-1912235-1617704.png'
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default CartItem;
