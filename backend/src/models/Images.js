const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  collectableId:{type:mongoose.Schema.Types.ObjectId}
})
module.exports = mongoose.model('Images', imageSchema)
