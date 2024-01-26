const Collections = require('../models/Collections');
const Users = require('../models/User');
const CollectionsTypes = require('../models/CollectionTypes');
const Items = require('../models/Items');
const Images = require('../models/Images');
const { ObjectId } = require('mongodb');

const getAllCollections = async (req, res) => {
	const userId = req.id;
	const collections_db = await Collections.find()
		.sort({ createdAt: -1 })
		.populate({
			path: 'owner',
			select: '_id name',
		})
		.populate('type')
		.lean();

	if (!collections_db) {
		return res.status(400).json({ message: 'No collections found' });
	}

	const collections = collections_db.map((item) => {
		return {
			...item,
			isLiked: userId ? item.likes.find((id) => id == userId) : false,
			likes: null,
		};
	});

	res.json({ collections });
};

const getCollection = async (req, res) => {
	const id = req.params.id;

	const userId = req.id;
	const query = [
		{ $match: { _id: ObjectId(id) } },

		{
			$lookup: {
				from: 'users',
				localField: 'owner',
				foreignField: '_id',
				as: 'owner_info',
			},
		},

		{ $unwind: '$owner_info' },
		{
			$lookup: {
				from: 'collectiontypes',
				localField: 'type',
				foreignField: '_id',
				as: 'type_info',
			},
		},
		{ $unwind: '$type_info' },
		{
			$lookup: {
				from: 'items',
				localField: '_id',
				foreignField: 'collectionId',
				as: 'items',
			},
		},
		{
			$addFields: {
				isLiked: {
					$in: [ObjectId(userId), '$likes'],
				},
				owner: {
					_id: '$owner_info._id',
					name: '$owner_info.name',
				},
				type: {
					_id: '$type_info._id',
					type: '$type_info.type',
				},
				items: {
					$map: {
						input: '$items',
						as: 'item',
						in: {
							$mergeObjects: [
								'$$item',
								{
									isLiked: {
										$in: [ObjectId(userId), '$$item.likes'],
									},
								},
							],
						},
					},
				},
			},
		},
		{
			$project: {
				owner_info: 0,
				type_info: 0,
				likes: 0,
				items: {
					likes: 0,
					// title:1,
					// isLiked:1
				},
			},
		},
	];

	const collection = (await Collections.aggregate(query))[0];

	if (!collection) {
		return res.status(400).json({ message: 'Collection not found' });
	}

	res.json(collection);
};

const getCollectionMini = async (req, res) => {
	const id = req.params.id;

	const userId = req.id; //нужно ли?

	const collection = await Collections.findById(id)
		.populate({
			path: 'owner',
			select: '_id name',
		})
		.select('owner allowedFields title')
		.lean();

	if (!collection) {
		return res.status(400).json({ message: 'Collection not found' });
	}

	res.json(collection);
};

const updateCollection = async (req, res) => {
	const collectioId = req.params.id;
	const userReqId = req.id;

	const collection = await Collections.findOne(
		{ _id: collectioId },
		{ owner: 1 },
	);
	if (!collection) {
		return res.status(404).json({ message: 'Collection not found' });
	}
	// biome-ignore lint/suspicious/noDoubleEquals: <explanation>
	if (userReqId != collection.owner) {
		return res.status(404).json({ message: 'You dont have permission' });
	}

	//mb this is as middleWare
	const { type } = req.body;
	const isTypeValid = await CollectionsTypes.findOne(
		{ type: type },
		{ _id: 1 },
	);
	if (!isTypeValid) {
		return res.status(400).json({ message: 'Collection Type is not valid' });
	}

	req.body.type = isTypeValid._id;

	if (req.body.updImg) {
		const imgObj = await Images.findOne({ collectableId: collectioId });
		if (imgObj) {
			req.body.img = imgObj.url;
		}
	}

	const collectionUpd = await Collections.findOneAndUpdate(
		{ _id: collectioId },
		req.body,
		{ new: true },
	);
	if (!collectionUpd) {
		return res.status(404).json({ message: 'Collection not found' });
	}
	//:()
	const { allowedFields } = collectionUpd;
	const idsOfFileds = allowedFields.map((a) => a._id?.toString());
	const delC = await Items.updateMany(
		{},
		{ $pull: { fields: { _id: { $nin: idsOfFileds } } } },
	);
	// i know its will await 1 by 1, but have no time to do normal
	for (const field of idsOfFileds) {
		await Items.updateMany(
			{ 'fields._id': { $ne: field } },
			{ $push: { fields: { _id: field, value: null } } },
		);
	}
	res.json(collectionUpd);
};

const createCollection = async (req, res) => {
	const { title, description, description_text, allowedFields, _id, updImg } =
		req.body;
	if (!title || !description) {
		return res
			.status(400)
			.json({ message: 'title and description are required' });
	}

	//mb this is as middleWare
	const { type } = req.body;
	const isTypeValid = await CollectionsTypes.findOne(
		{ type: type },
		{ _id: 1 },
	);

	if (!isTypeValid) {
		return res.status(400).json({ message: 'Collection Type is not valid' });
	}
	req.body.type = isTypeValid._id;

	const imgObj = updImg && (await Images.findOne({ collectableId: _id }));

	const owner = req.id;

	const createdCollection = await Collections.create({
		_id,
		title,
		description,
		description_text,
		allowedFields,
		owner,
		type: isTypeValid._id,
		img: imgObj?.url,
	});

	res.json(createdCollection);
};

const deleteCollection = async (req, res) => {
	const id = req.params.id;
	const userReqId = req.id;

	const collection = await Collections.findById(id);

	if (!collection) {
		return res.status(404).json({ message: 'Collection not found' });
	}

	// biome-ignore lint/suspicious/noDoubleEquals: <explanation>
	if (userReqId != collection.owner) {
		return res.status(404).json({ message: 'You dont have permission' });
	}

	const delCollection_p = collection.deleteOne();

	const delItems_p = Items.deleteMany({
		collectionId: collection._id,
	});

	await Promise.all([delItems_p, delCollection_p]);

	return res.json({ succes: true });
};

module.exports = {
	getAllCollections,
	createCollection,
	getCollection,
	updateCollection,
	getCollectionMini,
	deleteCollection,
};
