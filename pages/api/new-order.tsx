import { MongoClient } from 'mongodb';
import { Request, Response } from 'express';

async function handler(req: Request, res: Response) {
	const data = req.body;
	const client = await MongoClient.connect(
		'mongodb+srv://Now4czyk:Kacpern30@cluster0.h0u5c.mongodb.net/ProductsDB?retryWrites=true&w=majority'
	);
	const ordersCollection = client.db().collection('Orders');
	await ordersCollection.insertOne(data);
	client.close();
	res.status(201).json({ message: 'Order inserted!' });
}
export default handler;