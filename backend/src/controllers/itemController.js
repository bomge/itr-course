const Collections = require('../models/Collections');
const Items = require('../models/Items');
const Images = require('../models/Images');

const MAX_ITEM_TAGS = +process.env.MAX_ITEM_TAGS

//add to collection
const createItem = async (req, res) => {
    // const { title, description, fields } = req.body;
    // if (!title || !description) {
    //   return res
    // 	.status(400)
    // 	.json({ message: 'title and description are required' });
    // }

    const { id } = req.params;
	const userReqId = req.id;

	const collection = await Collections.findOne({ _id: id }, { owner: 1 });
    if (!collection) {
        return res.status(404).json({ message: 'Collection not found' });
    }
    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if (userReqId != collection.owner) {
        return res.status(404).json({ message: 'You dont have permission' });
    }

    if(req.body.tags?.length>MAX_ITEM_TAGS){
        return res.status(404).json({ message: 'Reached max Badges Count' });
    }

    const imgObj = req.body.updImg &&  await Images.findOne({collectableId: req.body._id})

    const createdItem = await Items.create({
        ...req.body,
        collectionId: id,
        owner:userReqId,
        img:  imgObj?.url
    });

    res.json({ succes: true, _id: createdItem._id });
};

const getItem = async (req, res) => {
    const { id } = req.params;
    const userId = req.id;
    console.log({id})
    const item = await Items.findById(id,{comments:0})
        .populate({
            path: 'owner',
            select: '_id name',
        })
        .lean();
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    const { allowedFields, title } = await Collections.findById(
        item.collectionId,
        { allowedFields: 1, title: 1 },
    );

    const needToRemove = [];
	//have to time to do on aggregation (do i need???)
    // Merge allowedFields into item.fields
    item.fields = item.fields.map((field) => {
        const allowed = allowedFields.find((f) => f._id == field._id);
        if (!allowed) {
            needToRemove.push(field);
            return null;
        }
        return {
            ...field,
            type: allowed.type,
            name: allowed.name,
        };
    });

    item.fields = item.fields.filter((x) => !!x);
    //Add collection title to response
    item.collectionTitle = title;

    item.isLiked = false;
    const iId = item._id.toString();
    if (userId) {
		item.isLiked=!!item.likes.find(uid=>uid == userId )
    }

    res.json(item);
};

const updateItem = async (req, res) => {
    const id = req.params.id;
    const userReqId = req.id;

    const item = await Items.findById(id);

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if (userReqId != item.owner) {
        return res.status(404).json({ message: 'You dont have permission' });
    }
    if(req.body.tags?.length>MAX_ITEM_TAGS){
        return res.status(404).json({ message: 'Reached max Badges Count' });
    }
    
    const collection = await Collections.findOne(
        { _id: item.collectionId },
        { allowedFields: 1 },
        { new: true },
    );
    if (!collection) {
        return res.status(404).json({ message: 'Collection not found' });
    }

    if(req.body.updImg){
        const imgObj = await Images.findOne({collectableId: id})
        if(imgObj){
            req.body.img = imgObj.url
        }
    }

    const item_updated = await item.updateOne(req.body);


    //:()
    const { allowedFields } = collection;
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

    res.json({ succes: true, _id: item._id });
};

const deleteItem = async (req,res) =>{
	const id = req.params.id;
    const userReqId = req.id;

    const item = await Items.findById(id, req.body);

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if (userReqId != item.owner) {
        return res.status(404).json({ message: 'You dont have permission' });
    }

	await item.deleteOne()
	return res.json({ succes: true });
}

module.exports = { createItem, getItem, updateItem, deleteItem };
