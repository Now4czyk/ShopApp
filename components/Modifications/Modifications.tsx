import classes from './_Modifications.module.scss';
import { useSelector } from 'react-redux';
import { authInfo } from '../../store/store';
import ModificationAdd from './ModificationAdd';
import ModificationChange from './ModificationChange';

const Modifications = () => {
	const authData = useSelector(authInfo);
	return (
		<>
			{!authData.isAdmin && (
				<p className={classes.notAdmin}>You are not in Admin Mode</p>
			)}
			{authData.isAdmin && (
				<div className={classes.list}>
					<ModificationAdd />
					<ModificationChange />
				</div>
			)}
		</>
	);
};

export default Modifications;
