import classes from './_FavoritesList.module.scss';
import { useSelector } from 'react-redux';
import { favoritesInfo } from '../../store/store';
import FavoritesItem from './FavoritesItem';

const FavoritesList = () => {
	const favoritesData = useSelector(favoritesInfo);
	return (
		<div className={classes.list}>
			{favoritesData.map((product) => (
				<FavoritesItem key={product.id} product={product} />
			))}
			{favoritesData.length === 0 && (
				<p className={classes.noFavorites}>There are no favorite products</p>
			)}
		</div>
	);
};

export default FavoritesList;
