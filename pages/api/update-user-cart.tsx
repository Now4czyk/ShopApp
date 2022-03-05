import { MongoClient } from 'mongodb';
import { Request, Response } from 'express';

async function handler(req: Request, res: Response) {
	if (req.method === 'POST') {
		const data = req.body;
		const client = await MongoClient.connect(
			'mongodb+srv://Now4czyk:Kacpern30@cluster0.h0u5c.mongodb.net/ProductsDB?retryWrites=true&w=majority'
		);
		const db = client.db();

		const cartsCollection = db.collection('Carts');
		const result = await cartsCollection.replaceOne({ _id: data.id }, data, {
			upsert: true,
		});

		console.log(result);

		client.close();

		res.status(201).json({ message: 'Cart inserted!' });
	}
}
export default handler;
