import { NextPage } from 'next';
import Head from 'next/head';
import Modifications from '../../components/Modifications/Modifications';

const ModificationPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Modifications</title>
				<meta name='description' content='Modifications of Products' />
			</Head>
			<Modifications />
		</>
	);
};

export default ModificationPage;
