//this middleware just add in body type for like. Cuz toogle like is unicified func (both for collection and item)

function likeCollection(req, res, next)  {
    req.body.type = 'collections';
	next()
}
function likeItem(req, res, next)  {
    req.body.type = 'items';
	next()
}

module.exports = {
	likeCollection,
	likeItem
}