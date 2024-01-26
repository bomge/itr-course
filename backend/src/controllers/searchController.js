const Collections = require('../models/Collections');
const CollectionsTypes = require('../models/CollectionTypes');
const Items = require('../models/Items');
const Users = require('../models/User');
const { ObjectId } = require('mongodb');
//7 larger collections
//7 newest items

const COLLECTIONS_COUNT = +process.env.HOMEDATA_COLLECTIONS_COUNT;
const ITEMS_COUNT = +process.env.HOMEDATA_ITEMS_COUNT;

const homeData = async (req, res) => {
	const userId = req.id;
	const queryCollectionLargest = [
		{
			$group: {
				_id: '$collectionId',
				count: { $sum: 1 },
			},
		},
		{
			$sort: { count: -1 },
		},
		{
			$limit: COLLECTIONS_COUNT,
		},
		{
			$lookup: {
				from: 'collections',
				localField: '_id',
				foreignField: '_id',
				as: 'collection',
			},
		},
		{
			$lookup: {
				from: 'users',
				localField: 'collection.owner',
				foreignField: '_id',
				as: 'owner_info',
			},
		},
		{ $unwind: '$owner_info' },
		{
			$lookup: {
				from: 'collectiontypes',
				localField: 'collection.type',
				foreignField: '_id',
				as: 'type_info',
			},
		},
		{ $unwind: '$type_info' },
		{
			$replaceRoot: {
				newRoot: {
					$mergeObjects: [{ $arrayElemAt: ['$collection', 0] }, '$$ROOT'],
				},
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
			},
		},
		{
			$project: {
				collection: 0,
				likes: 0,
				owner_info: 0,
				type_info: 0,
			},
		},
	];
	const collectionLargestSeven_p = Items.aggregate(queryCollectionLargest);

	const newestItemsSeven_p = Items.find({}, { comments: 0 })
		.sort({ createdAt: -1 })
		.limit(ITEMS_COUNT)
		.populate({
			path: 'owner',
			select: '_id name',
		})
		.populate({
			path: 'collectionId',
			select: '_id title',
		})
		.lean();

	const uniqueTagsUsage_p = Items.aggregate([
		{ $unwind: '$tags' },

		{
			$group: {
				_id: '$tags.text',
				count: { $sum: 1 },
			},
		},

		{
			$project: {
				_id: 0,
				text: '$_id',
				count: 1,
			},
		},
	]);

	const [collectionLargestSeven, newestItemsSeven, uniqueTagsUsage] =
		await Promise.all([
			collectionLargestSeven_p,
			newestItemsSeven_p,
			uniqueTagsUsage_p,
		]);

	const items = newestItemsSeven.map((item) => {
		return {
			...item,
			isLiked: userId ? item.likes.find((id) => id == userId) : false,
			likes: null,
		};
	});
	return res.json({
		collections: collectionLargestSeven,
		items,
		tags: uniqueTagsUsage,
	});
};

const userAllObjects = async (req, res) => {
	const fetchUserId = req.params.id;
	const reqUserId = req.id;
	console.log({ fetchUserId });
	const owner = await Users.findById(fetchUserId, { name: 1 });
	if (!owner) {
		return res.status(404).json({ message: 'User not found' });
	}

	const query = [
		{ $match: { owner: ObjectId(fetchUserId) } },

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
			$addFields: {
				isLiked: {
					$in: [ObjectId(reqUserId), '$likes'],
				},
				owner: {
					_id: '$owner_info._id',
					name: '$owner_info.name',
				},
				type: {
					_id: '$type_info._id',
					type: '$type_info.type',
				},
			},
		},
		{
			$project: {
				owner_info: 0,
				type_info: 0,
				likes: 0,
			},
		},
	];
	const items_p = Items.find({ owner: ObjectId(fetchUserId) }, { comments: 0 })
		.sort({ createdAt: -1 })
		.populate({
			path: 'owner',
			select: '_id name',
		})
		.populate({
			path: 'collectionId',
			select: '_id title',
		})
		.lean();
	const collections_p = Collections.aggregate(query);

	const [collections, userItems] = await Promise.all([collections_p, items_p]);
	const items = userItems.map((item) => {
		return {
			...item,
			isLiked: reqUserId ? item.likes.find((id) => id == reqUserId) : false,
			likes: null,
		};
	});

	res.json({ collections, items, ownerName: owner.name });
};

const uniqueItemTags = async (req, res) => {
	const uniqueTags = await Items.distinct('tags.text');

	return res.json({ tags: uniqueTags });
};

const simpleSerachTagCategory = async (req, res) => {
	const userId = req.id;
	const { tag, category } = req.body;
	const result = { items: [], collections: [] };

	if (tag) {
		const items_db = await Items.find({
			'tags.text': tag,
		})
			.sort({ createdAt: -1 })
			.populate({
				path: 'owner',
				select: '_id name',
			})
			.populate({
				path: 'collectionId',
				select: '_id title',
			})
			.lean();

		const items = items_db.map((item) => {
			return {
				...item,
				isLiked: userId ? item.likes.find((id) => id == userId) : false,
				likes: null,
			};
		});

		result.items = items;
	} else if (category) {
		const recordsTypeId = (await CollectionsTypes.findOne({ type: category }))
			?._id;
		console.log(recordsTypeId);
		if (recordsTypeId) {
			const recordsCollections = await Collections.find({
				type: recordsTypeId,
			})
				.sort({ createdAt: -1 })
				.populate({
					path: 'owner',
					select: '_id name',
				})
				.populate('type');
			result.collections = recordsCollections;
		}
	}

	return res.json(result);
};

const textSearch = async (req, res) => {
	const userId = req.id;
	const { text } = req.body;
	const result = { items: [], collections: [] };

	const searchText = `"${text}"`;

	// let author_p = Users.find({$text: {$search: searchText}})
	const collections_p = Collections.find({ $text: { $search: searchText } })
		.sort({ createdAt: -1 })
		.populate({
			path: 'owner',
			select: '_id name',
		})
		.populate({
			path: 'type',
		})
		.lean();
	const items_p = Items.find({ $text: { $search: searchText } })
	.sort({ createdAt: -1 }).populate({
			path: 'owner',
			select: '_id name',
		})
		.populate({
			path: 'collectionId',
			select: '_id title',
		})
		.lean();

	const tags_p = CollectionsTypes.find({
		$text: { $search: searchText },
	}).lean();

	const [collections_res, items_res, tags_res] = await Promise.all([
		collections_p,
		items_p,
		tags_p,
	]);

	//search collection by tags
	const tagPromises = tags_res.map((tag) => {
		return Collections.find({ type: tag._id }).select({ title: 1, _id: 1 });
	});
	const collectionsRes2 = await Promise.all(tagPromises);
	if (collectionsRes2[0]) collections_res.push(...collectionsRes2);

	const items = items_res.map((item) => {
		return {
			...item,
			isLiked: userId ? item.likes.find((id) => id == userId) : false,
			likes: null,
		};
	});
	const collections = collections_res.map((item) => {
		return {
			...item,
			isLiked: userId ? item.likes.find((id) => id == userId) : false,
			likes: null,
		};
	});

	result.items = items;
	result.collections = collections;

	res.json(result);
};
const textSearchMified = async (req, res) => {
	const userId = req.id;
	const { text } = req.body;
	const result = { items: [], collections: [] };

	// const searchText = `"${text}"`;
	const searchText = `${text}`;

	// let author_p = Users.find({$text: {$search: searchText}})
	const collections_p = Collections.find(
		{ $text: { $search: searchText } },
		{ title: 1, _id: 1 },
	);
	const items_p = Items.find(
		{ $text: { $search: searchText } },
		{ title: 1, _id: 1 },
	);
	const tags_p = CollectionsTypes.find({
		$text: { $search: searchText },
	}).lean();

	const [collections_res, items_res, tags_res] = await Promise.all([
		collections_p,
		items_p,
		tags_p,
	]);

	//search collection by tags
	const tagPromises = tags_res.map((tag) => {
		return Collections.find({ type: tag._id }).select({ title: 1, _id: 1 });
	});
	const collectionsRes2 = await Promise.all(tagPromises);
	if (collectionsRes2[0]) collections_res.push(...collectionsRes2[0]);

	result.items = items_res;
	result.collections = collections_res;

	res.json(result);
};

module.exports = {
	homeData,
	userAllObjects,
	uniqueItemTags,
	simpleSerachTagCategory,
	textSearch,
	textSearchMified,
};
