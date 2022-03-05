import classes from './ModificationChange.module.css';
import { useState } from 'react';

const ModificationChange = () => {
	const [isSectionVisible, setIsSectionVisible] = useState(false);
	return (
		<div className={classes.modificationChange}>
			<button className={classes.changeProduct}>Change an Existing Product</button>
		</div>
	);
};

export default ModificationChange;
