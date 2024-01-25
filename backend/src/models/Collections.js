const mongoose = require('mongoose');


const CollectionSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        description_text: { type: String, required: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        // type: { type: String, required: true },
        img: { type: String },
        allowedFields: [
            {
                type: { type: String },
                name: { type: String },
            },
        ],
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'CollectionTypes' },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
    { timestamps: true, strict: false },
);


module.exports = mongoose.model('Collections', CollectionSchema); // Singular model name
