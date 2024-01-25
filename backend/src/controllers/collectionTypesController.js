const CollectionsTypes = require('../models/CollectionTypes');

const getAllTypes = async (req, res) => {
	console.log('asd')

  const types = await CollectionsTypes.find({},{_id:0})
  
  if (!types) {
    return res.status(400).json({ message: 'No collectionsTypes found' });
  }
  res.json(types);
};


// init
async function seedTypes(req,res){
	const collectionTypes = [
		"Books",
		"Movies",
		"Video Games", 
		"Comic Books",
		"Stamps",
		"Coins",
		"Action Figures",
		"Diecast Cars",
		"Dolls",
		"Antiques",
		"Records",
		"CDs", 
		"DVDs",
		"Autographs",
		"Sports Cards",
		"Fine Art", 
		"Watches",
		"Sneakers",
		"Vintage Clothing",
		"Jewelry" 
	  ];

	const typeDocs = collectionTypes.map(type => ({type}));
  
	const bulkOps = typeDocs.map(type => ({
	  insertOne: {
		document: type
	  }
	}));
  
	await CollectionsTypes.bulkWrite(bulkOps);
	
	return res.json({message:'Collection Types Seeded'});
}

module.exports = {
	getAllTypes,
	seedTypes
}