const mongoose = require('mongoose')

const TypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
})
module.exports = mongoose.model('CollectionTypes', TypeSchema)
