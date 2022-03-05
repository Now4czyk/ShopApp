import MainHeader from './MainHeader';
import classes from './Layout.module.css';
import { useSelector } from 'react-redux';
import { authInfo } from '../../store/store';

const Layout: React.FC = (props) => {
	const authData = useSelector(authInfo);

	return (
		<>
			{authData.isAdmin && <div className={classes.adminBelt}>Admin Mode</div>}
			<MainHeader />
			<div className={classes.card}>{props.children}</div>
		</>
	);
};

export default Layout;
