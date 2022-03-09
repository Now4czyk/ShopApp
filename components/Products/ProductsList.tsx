import classes from './_ProductList.module.scss';
import { useSelector } from 'react-redux';
import { availableProductsInfo } from '../../store/store';
import Product from './Product';

type dummyValues = {
	url: string;
	title: string;
	price: number;
};

const DUMMY_PRODUCTS: dummyValues[] = [
	{
		url: 'https://img01.ztat.net/article/spp-media-p1/b40edc272cad3ee39b60330ce41cce81/e69c6f3a8f1b45ec844359e650ec71c7.jpg?imwidth=762',
		title: 'Blue T-shirt',
		price: 11.99,
	},
	{
		url: 'https://img01.ztat.net/article/spp-media-p1/cc147f4236ce3a43a5fe6d7b119ff3f0/6e1e28694a094153bc27bfdd01f11843.jpg?imwidth=762',
		title: 'Black Trousers',
		price: 21.99,
	},
	{
		url: 'https://img01.ztat.net/article/spp-media-p1/1fdcb99b3dc33cd3bad3bf13530983ee/fa13917eaf5442c18fe671c32ca4beb1.jpg?imwidth=762',
		title: 'Red Shirt',
		price: 31.99,
	},
	{
		url: 'https://img01.ztat.net/article/spp-media-p1/8e5ef42f60bd4881adf86c50a14a35a4/3b6fd39b688e4848b92485901977a9e3.jpg?imwidth=762',
		title: 'Blue Shirt',
		price: 23.99,
	},
	{
		url: 'https://img01.ztat.net/article/spp-media-p1/93bab441a4dd308f872af3d9ae6e53d4/f50037200fc24e2fb133c1f97a60e295.jpg?imwidth=762',
		title: 'White T-shirt',
		price: 42.99,
	},
	{
		url: 'https://img01.ztat.net/article/spp-media-p1/c0b424d3c7ea498d8f3a5141c534b5a2/064957ac72374f2ebb80b9dfa5556e74.jpg?imwidth=762',
		title: 'Brown Skirt',
		price: 34.99,
	},
	{
		url: 'https://img01.ztat.net/article/spp-media-p1/a5c26fbde48a323795186619671eadec/f617ee72e2fa426288d4707d8ad85992.jpg?imwidth=762',
		title: 'Gray Trousers',
		price: 37.99,
	},
	{
		url: 'https://img01.ztat.net/article/spp-media-p1/5c81f64c46c9318da7ee2b9af2f178a6/5f0e714ddbbb4d5180a25835a0e51cfa.jpg?imwidth=762',
		title: 'Checked Trousers',
		price: 14.99,
	},
];

// CODE FOR POSTING IN A DB
// const router = useRouter();
// async function addMeetupHandler(DUMMY_PRODUCTS: dummyValues[]) {
// 	const response = await fetch('/api/new-product', {
// 		method: 'POST',
// 		body: JSON.stringify(DUMMY_PRODUCTS),
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 	});
// 	const data = await response.json();
// 	console.log(data);
// 	router.replace('/');
// }

// useEffect(() => {
// 	addMeetupHandler(DUMMY_PRODUCTS);
// }, []);

const ProductsList = () => {
	const availableProductsData = useSelector(availableProductsInfo);
	return (
		<>
			<div className={classes.container}>
				{availableProductsData.map((product) => (
					<Product
						url={product.url}
						title={product.title}
						price={product.price}
						id={product.id}
						key={product.id}
					/>
				))}
			</div>
		</>
	);
};

export default ProductsList;
