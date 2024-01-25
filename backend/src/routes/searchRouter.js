const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController')




router.route('/homeData').get(searchController.homeData);

router.route('/search/userCollections/:userId').get(searchController.userAllObjects)
router.route('/uniqueItemTags').get(searchController.uniqueItemTags)
router.route('/search').post(searchController.simpleSerachTagCategory)


module.exports = router;
