const mongoose = require('mongoose');

/* const CollectionSchema = new mongoose.Schema(
    {
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'CollectionTypes' },
    })
    const TypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
})
 */

//title description_text allowedFields.name 
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
CollectionSchema.index({title: 'text', 'description_text': 'text', 'allowedFields.name':"text"}, {name: 'text_index'})

module.exports = mongoose.model('Collections', CollectionSchema); // Singular model name
