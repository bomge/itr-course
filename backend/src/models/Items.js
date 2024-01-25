const mongoose = require('mongoose');

const Commentchema = new mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
	text: { type: String },
	date: { type: Date, default: new Date() },
});

//title tags.text comments.text fields.value
const ItemSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
			populate: {
				select: { _id: 1, name: 1 },
			},
		},
		title: { type: String, required: true },
		tags: [{ color: String, text: String }],
		fields: [
			{
				_id: String,
				value: mongoose.Schema.Types.Mixed,
			},
		],
		comments: [Commentchema],
		collectionId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Collections',
		},
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		img: { type: String },
	},
	{ strict: false, timestamps: true },
);

ItemSchema.index(
	{ title: 'text', 'tags.text': 'text', 'comments.text': 'text',  'fields.value': 'text'},
	{ name: 'text_index' },
);

module.exports = mongoose.model('Items', ItemSchema);
