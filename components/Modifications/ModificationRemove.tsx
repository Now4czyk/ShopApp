import classes from './ModificationRemove.module.css';
import { useState } from 'react';
const ModificationRemove = () => {
	const [isSectionVisible, setIsSectionVisible] = useState(false);

	const sectionVisibilityHandler = () => {
		setIsSectionVisible(!isSectionVisible);
	};

	return (
		<div className={classes.modificationRemove}>
			{!isSectionVisible ? (
				<button
					onClick={sectionVisibilityHandler}
					className={classes.removeProduct}>
					Remove a Product
				</button>
			) : (
				<>
				<div className={classes.title}>Remove a Product</div>
				<ul>
					<li></li>
				</ul>
				</>
			)}
		</div>
	);
};

export default ModificationRemove;
