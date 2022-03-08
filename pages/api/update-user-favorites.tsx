import { MongoClient } from 'mongodb';
import { Request, Response } from 'express';

async function handler(req: Request, res: Response) {
	const data = req.body;
	const client = await MongoClient.connect(
		'mongodb+srv://Now4czyk:Kacpern30@cluster0.h0u5c.mongodb.net/ProductsDB?retryWrites=true&w=majority'
	);
	const favoritesCollection = client.db().collection('Favorites');
	await favoritesCollection.replaceOne({ _id: data.id }, data, {
		upsert: true,
	});
	client.close();
	res.status(201).json({ message: 'Favorites inserted!' });
}
export default handler;
