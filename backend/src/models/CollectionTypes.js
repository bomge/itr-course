const mongoose = require('mongoose')

const TypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
})
TypeSchema.index({type: 'text'}, {name: 'text_index'})

module.exports = mongoose.model('CollectionTypes', TypeSchema)
