import classes from './Modifications.module.css';
import ModificationAdd from './ModificationAdd';
import ModificationChange from './ModificationChange';
import { useSelector } from 'react-redux';
import { authInfo } from '../../store/store';

const Modifications = () => {
	const authData = useSelector(authInfo);
	return (
		<>
			{!authData.isAdmin && (
				<p className={classes.notAdmin}>You are not in Admin Mode</p>
			)}
			{authData.isAdmin && (
				<div className={classes.list}>
					<ModificationAdd/>
					<ModificationChange />
				</div>
			)}
		</>
	);
};

export default Modifications;
