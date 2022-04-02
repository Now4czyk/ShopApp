import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';

async function handler(req: Request, res: Response) {
	const data = req.body;
	const client = await MongoClient.connect(process.env.NEXT_PUBLIC_DB);
	const productsCollection = client.db().collection('Products');

	if (req.method === 'DELETE') {
		await productsCollection.deleteOne({
			_id: new ObjectId(data.id),
		});
		client.close();
		res.status(201).json({ message: 'Product deleted!' });
	}
	if (req.method === 'PUT') {
		await productsCollection.replaceOne(
			{ _id: new ObjectId(data.id) },
			data.change
		);
		client.close();
		res.status(201).json({ message: 'Product changed!' });
	}
}
export default handler;
