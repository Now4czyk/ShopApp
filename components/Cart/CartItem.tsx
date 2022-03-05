import { data, setCart } from '../../store/Slices/cartSlice';
import classes from './CartItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../store/Slices/cartSlice';
import { useRouter } from 'next/router';
import { cartInfo } from '../../store/store';
import { Dispatch, SetStateAction } from 'react';

const CartItem: React.FC<{
	product: data;
	setMaxQuantity: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const cartData = useSelector(cartInfo);
	const quantity = cartData.reduce((sum, product) => {
		return sum + product.quantity;
	}, 0);
	const addProductHandler = () => {
		const { url, title, price, id, key, size } = props.product;
		const product = { url, title, price, id, key, quantity: 1, size };
		if (product.quantity + quantity < 1000) {
			dispatch(addToCart(product));
			props.setMaxQuantity(false);
		} else {
			props.setMaxQuantity(true);
		}
	};
	const redirectHandler = () => {
		router.push(`./${props.product.id}`);
	};
	const removeProductHandler = () => {
		dispatch(removeFromCart(props.product));
		props.setMaxQuantity(false);
	};
	const removePositionHandler = () => {
		const data = cartData.filter((product) => product.id !== props.product.id);
		dispatch(setCart(data));
	};

	return (
		<>
			<div className={classes.item}>
				<img
					className={classes.productImg}
					onClick={redirectHandler}
					src={props.product.url}
				/>
				<div className={classes.data}>
					<div onClick={redirectHandler} className={classes.title}>
						{props.product.title}
						<span className={classes.id}>({props.product.id})</span>
					</div>

					<div className={classes.priceAndQuantity}>
						${props.product.price}
						<span className={classes.quantity}>x{props.product.quantity}</span>
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
		</>
	);
};

export default CartItem;
