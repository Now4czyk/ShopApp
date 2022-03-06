import classes from './ModificationChange.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { availableProductsInfo } from '../../store/store';
import ModificationChangeListItem from './ModificationChangeListItem';

const ModificationChange = () => {
	const [isSectionVisible, setIsSectionVisible] = useState(false);
	const availableProductsData = useSelector(availableProductsInfo);

	const sectionVisibilityHandler = () => {
		setIsSectionVisible(!isSectionVisible);
	};

	return (
		<div className={classes.modificationChange}>
			{!isSectionVisible ? (
				<button
					onClick={sectionVisibilityHandler}
					className={classes.changeProduct}>
					Change Available Products
				</button>
			) : (
				<>
					<div className={classes.title}>Change Available Products</div>
					<button onClick={sectionVisibilityHandler} className={classes.cancel}>
						Cancel
					</button>
					{availableProductsData.map((product) => (
						<ModificationChangeListItem
							product={{
								title: product.title,
								url: product.url,
								id: product.id,
								key: product.id,
								price: product.price,
							}}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default ModificationChange;
