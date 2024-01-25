const Collections = require('../models/Collections');
const Items = require('../models/Items');


const toggleLikeCollection = async (req, res) => { //prev it was for item and collection (switch case)
    const { id, type } = req.body;
	
	if(!id || !type){
		return res.status(400).json({message:"You cannot like noncreated object"})
	}

    const userReqId = req.id;
	const obj = await Collections.findOne({_id: id})

	if(!obj){
		return res.status(400).json({ message: 'Collection not found' });
	}

	const isLiked = obj.likes.includes(userReqId)
	let result
	if(isLiked){
		result = await Collections.findOneAndUpdate({_id: id},{$pull:{likes: userReqId}})
	} else {
		result = await Collections.findOneAndUpdate({_id: id},{$push:{likes: userReqId}})
	}
	

    res.json({isLiked:!isLiked});
};

const toggleLikeItem = async (req, res) => { //prev it was for item and collection (switch case)
    const { id, type } = req.body;
	
	if(!id || !type){
		return res.status(400).json({message:"You cannot like noncreated object"})
	}

    const userReqId = req.id;
	const obj = await Items.findOne({_id: id})
	if(!obj)
		return res.status(400).json({ message: 'Item not found' });
	const isLiked = obj.likes.includes(userReqId)
	let result
	if(isLiked){
		result = await Items.findOneAndUpdate({_id: id},{$pull:{likes: userReqId}})
	} else {
		result = await Items.findOneAndUpdate({_id: id},{$push:{likes: userReqId}})
	}
	

    res.json({isLiked:!isLiked});
};

module.exports = {
    toggleLikeCollection,
	toggleLikeItem
};
