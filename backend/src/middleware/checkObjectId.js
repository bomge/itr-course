const {isValidObjectId} = require('../util/util')

function ObjectIdCheck(req, res, next) {
	const {id} = req.params
	if(!id){
		return res.status(400).json({message:"No id specified"})
	}
	if(!isValidObjectId(id)){
		return res.status(400).json({message:"Bad id specified"})
	}
	return next()
  }
  module.exports = ObjectIdCheck
  