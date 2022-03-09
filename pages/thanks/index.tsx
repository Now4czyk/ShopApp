import { NextPage } from 'next';
import Head from 'next/head';
import Thanks from '../../components/Others/Thanks';

const ThanksPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Order Completed</title>
				<meta name='description' content='Thanks for your order' />
			</Head>
			<Thanks/>
		</>
	);
};

export default ThanksPage;
