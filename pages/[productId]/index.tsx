import type { NextPage } from 'next';
import Head from 'next/head';
import ProductDetails from '../../components/Products/ProductDetails';
import { GetStaticPaths } from 'next';

const ProductDetailsPage: NextPage<{ id: string }> = (props) => {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Product Details' />
			</Head>
			<ProductDetails id={props.id} />
		</>
	);
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export async function getStaticProps(context: any) {
	const productId = context.params.productId;
	return {
		props: {
			id: productId,
		},
	};
}

export default ProductDetailsPage;
