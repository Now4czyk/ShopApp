import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import { useDispatch } from 'react-redux';
import { setAvailableProducts } from '../store/Slices/availableProductsSlice';
import ProductsList from '../components/Products/ProductsList';

type productsFromDB = {
	title: string;
	price: number;
	url: string;
	id: string;
};

const Home: NextPage<{ products: productsFromDB[] }> = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		const availableProducts = props.products.map((product) => ({
			url: product.url,
			title: product.title,
			price: product.price,
			key: product.id,
			id: product.id,
		}));
		dispatch(setAvailableProducts(availableProducts));
	}, []);
	return (
		<div>
			<Head>
				<title>ReactShop</title>
				<meta name='description' content='A page with available products' />
			</Head>
			<ProductsList />
		</div>
	);
};

export default Home;

export async function getStaticProps() {
	const client = await MongoClient.connect(
		'mongodb+srv://Now4czyk:Kacpern30@cluster0.h0u5c.mongodb.net/ProductsDB?retryWrites=true&w=majority'
	);
	const products = await client.db().collection('Products').find().toArray();
	client.close();
	return {
		props: {
			products: products.map((product) => ({
				title: product.title,
				price: product.price,
				url: product.url,
				id: product._id.toString(),
			})),
		},
		revalidate: 1,
	};
}
