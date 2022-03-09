import { GetStaticPaths } from 'next';
import Head from 'next/head';
import type { NextPage } from 'next';
import ProductDetails from '../../components/Products/ProductDetails';

const ProductDetailsPage: NextPage<{ id: string }> = (props) => {
	return (
		<>
			<Head>
				<title>Product Details</title>
				<meta name='description' content='Details of a Product' />
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
