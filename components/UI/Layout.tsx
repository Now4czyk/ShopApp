import classes from './_Layout.module.scss';
import { useSelector } from 'react-redux';
import { authInfo } from '../../store/store';
import Footer from './Footer';
import MainHeader from './MainHeader';

const Layout: React.FC = (props) => {
	const authData = useSelector(authInfo);

	return (
		<>
			{authData.isAdmin && <div className={classes.adminBelt}>Admin Mode</div>}
			<MainHeader />
			<div className={classes.card}>{props.children}</div>
			<Footer/>
		</>
	);
};

export default Layout;
