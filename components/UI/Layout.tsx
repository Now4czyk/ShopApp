import classes from './_Layout.module.scss';
import { useSelector } from 'react-redux';
import { authInfo } from '../../store/store';
import Footer from './Footer';
import MainHeader from './MainHeader';

const Layout: React.FC = (props) => {
	const authData = useSelector(authInfo);

	return (
		<>
			{authData.isAdmin && (
				<div className={`${classes.adminBelt} ${classes.isMargin}`}>
					Admin Mode
				</div>
			)}
			<MainHeader />
			<div
				className={
					authData.isAdmin
						? classes.card
						: `${classes.card} ${classes.isMargin}`
				}>
				{props.children}
			</div>
			<Footer />
		</>
	);
};

export default Layout;
