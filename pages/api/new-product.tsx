import { MongoClient } from 'mongodb';
import { Request, Response } from 'express';

async function handler(req: Request, res: Response) {
	const data = req.body;
	const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB);
	const productsCollection = client.db().collection('Products');
	await productsCollection.insertOne(data);
	client.close();
	res.status(201).json({ message: 'Product inserted!' });
}
export default handler;
