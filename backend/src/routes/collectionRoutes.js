const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const collectionTypesController = require('../controllers/collectionTypesController');
const likesController = require('../controllers/likesController');

const {likeCollection} = require('../middleware/likeType')

const verifyJWT = require('../middleware/verifyJWT');

router.route('/getAll').get(collectionController.getAllCollections);
router.route('/types').get(collectionTypesController.getAllTypes);
router.route('/:id').get(collectionController.getCollection);

router.use(verifyJWT);
router.route('/new').post(collectionController.createCollection);
router.route('/like').put(likeCollection, likesController.toggleLikeCollection);
router.route('/seedTypes').get(collectionTypesController.seedTypes);
router.route('/mini/:id').get(collectionController.getCollectionMini);
router.route('/:id').post(collectionController.updateCollection);
router.route('/:id').delete(collectionController.deleteCollection);

module.exports = router;
