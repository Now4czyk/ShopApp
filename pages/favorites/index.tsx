import { NextPage } from 'next';
import Favorites from '../../components/Favorites/Favorites';
import Head from 'next/head';

const FavoritesPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Favorites</title>
				<meta name='description' content='Favorites Products' />
			</Head>
			<Favorites/>
		</>
	);
};

export default FavoritesPage;
