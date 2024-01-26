function isValidObjectId(id) {
	if (typeof id !== 'string') {
		return false;
	}

	const ObjectId = require('mongoose').Types.ObjectId;
	return ObjectId.isValid(id);
}

module.exports = {
	isValidObjectId,
};
