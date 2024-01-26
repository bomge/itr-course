const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController')


const checkObjectId = require('../middleware/checkObjectId')

router.route('/homeData').get(searchController.homeData);

router.route('/search/userCollections/:id').get(checkObjectId,searchController.userAllObjects)
router.route('/uniqueItemTags').get(searchController.uniqueItemTags)
router.route('/search/filter').post(searchController.simpleSerachTagCategory)
router.route('/search/minified').post(searchController.textSearchMified)
router.route('/search/').post(searchController.textSearch)


module.exports = router;
