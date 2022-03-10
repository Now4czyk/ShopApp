import classes from './_ProductList.module.scss';
import { useSelector } from 'react-redux';
import { availableProductsInfo } from '../../store/store';
import Product from './Product';

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
