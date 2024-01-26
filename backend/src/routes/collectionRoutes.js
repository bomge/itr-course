const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const collectionTypesController = require('../controllers/collectionTypesController');
const likesController = require('../controllers/likesController');

const {likeCollection} = require('../middleware/likeType')
const checkObjectId = require('../middleware/checkObjectId')
const verifyJWT = require('../middleware/verifyJWT');

router.route('/getAll').get(collectionController.getAllCollections);
router.route('/types').get(collectionTypesController.getAllTypes);
router.route('/:id').get(checkObjectId,collectionController.getCollection);
router.route('/seed/types').get(collectionTypesController.seedTypes);

router.use(verifyJWT);
router.route('/new').post(collectionController.createCollection);
router.route('/like').put(likeCollection, likesController.toggleLikeCollection);
router.route('/mini/:id').get(checkObjectId,collectionController.getCollectionMini);
router.route('/:id').post(checkObjectId,collectionController.updateCollection);
router.route('/:id').delete(checkObjectId,collectionController.deleteCollection);

module.exports = router;
