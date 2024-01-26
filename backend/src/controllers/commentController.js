const Items = require('../models/Items');

const MAX_COMMENT_LENGTH = +process.env.MAX_COMMENT_LENGTH

const postComment = async (req, res) => {
    const { text } = req.body;
    //move check to lib, cuz its awful....
    if (!text) {
        return res
            .status(400)
            .json({ message: 'title and description are required' });
    }
    if (text.length > MAX_COMMENT_LENGTH) {
        return res
            .status(400)
            .json({ message: 'Text is to long. Max length is 512' });
    }

    const { id } = req.params;
    const userReqId = req.id;

    const item = await Items.findOne({ _id: id });
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    await item.updateOne({
        $push: {
            comments: {
                author: userReqId,
                date: new Date(), //maybe use momemnt, idk
                text: req.body.text,
            },
        },
    });

    res.json({ succes: true });
};

const getComments = async (req, res) => {
    const { id } = req.params;

    const item = await Items.findById(id)  .populate({
		path: 'comments',
		select: 'author', // only populate the author field
		populate: {
		  path: 'author',
		  select: 'name _id' // only select the name and _id for the populated author
		}
	  })

    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item.comments);
};

module.exports = {
    postComment,
    getComments,
};
