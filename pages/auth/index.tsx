import Head from 'next/head';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MongoClient } from 'mongodb';
import { useSelector } from 'react-redux';
import { authInfo } from '../../store/store';
import AuthForm from '../../components/Auth/AuthForm';

type cartsFromDB = {
	id: string;
	_id: string;
	cartData: {
		url: string;
		title: string;
		price: number;
		id: string;
		key: string;
		quantity: number;
		size: string;
	}[];
};

type favoritesFromDB = {
	id: string;
	_id: string;
	favoritesData: {
		url: string;
		title: string;
		price: number;
		id: string;
	}[];
};

const AuthPage: NextPage<{
	carts: cartsFromDB[];
	favorites: favoritesFromDB[];
}> = (props) => {
	const authData = useSelector(authInfo);
	const router = useRouter();

	const carts = props.carts.map((cart) => {
		return { id: cart.id, cart: cart.cartData };
	});

	const favorites = props.favorites.map((favorite) => {
		return { id: favorite.id, favorites: favorite.favoritesData };
	});

	if (authData.isLoggedIn === true) {
		router.push('/');
	}
	return (
		<div>
			<Head>
				<title>Authentication</title>
				<meta name='description' content='Authenticaiton of a User' />
			</Head>
			<AuthForm carts={carts} favorites={favorites} />
		</div>
	);
};

export default AuthPage;

export async function getStaticProps() {
	const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB);
	const carts = await client.db().collection('Carts').find().toArray();
	const favorites = await client.db().collection('Favorites').find().toArray();
	client.close();

	return {
		props: {
			carts,
			favorites,
		},
		revalidate: 1,
	};
}
