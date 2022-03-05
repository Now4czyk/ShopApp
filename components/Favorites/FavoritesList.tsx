import FavoritesItem from './FavoritesItem';
import classes from './FavoritesList.module.css';
import { favoritesInfo } from '../../store/store';
import { useSelector } from 'react-redux';

const FavoritesList = () => {
	const favoritesData = useSelector(favoritesInfo);
	return (
		<div className={classes.list}>
			{favoritesData.map(product=><FavoritesItem product={product}/>)}
			{favoritesData.length===0 && <p className={classes.noFavorites}>There are no favorite products</p>}
		</div>
	);
};

export default FavoritesList;
