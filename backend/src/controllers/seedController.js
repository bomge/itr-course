const CollectionsTypes = require('../models/CollectionTypes');

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
		"Jewelry" ,
		'Cards',
		'Lego',
		'Knives',
		'Posters',
		'Other'
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
	seedTypes
}