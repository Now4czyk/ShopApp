import Head from 'next/head';
import { NextPage } from 'next';
import Cart from '../../components/Cart/Cart';

const CartPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Cart</title>
				<meta name='description' content='Cart full of Products' />
			</Head>
			<Cart />
		</>
	);
};

export default CartPage;
