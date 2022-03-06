import { MongoClient, ObjectId } from 'mongodb';
import { Request, Response } from 'express';

async function handler(req: Request, res: Response) {
	const data = req.body;
	const client = await MongoClient.connect(
		'mongodb+srv://Now4czyk:Kacpern30@cluster0.h0u5c.mongodb.net/ProductsDB?retryWrites=true&w=majority'
	);
	const db = client.db();

	const productsCollection = db.collection('Products');

	if (req.method === 'DELETE') {
		const result = await productsCollection.deleteOne({
			_id: new ObjectId(data.id),
		});

		console.log(result);

		client.close();

		res.status(201).json({ message: 'Product deleted!' });
	}
	if (req.method === 'PUT') {
		const result = await productsCollection.replaceOne(
			{ _id: new ObjectId(data.id) },
			data.change
		);

		console.log(result);

		client.close();

		res.status(201).json({ message: 'Product changed!' });
	}
}
export default handler;
