const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, default: 'No Name' },
  password: { type: String },
  email: { type: String, unique: true },
  status: { type: String, default: 'active' },
  customId: { type: String},
})
module.exports = mongoose.model('Users', userSchema)
