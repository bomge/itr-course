const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const likesController = require('../controllers/likesController');
const itemController = require('../controllers/itemController')
const commentController = require('../controllers/commentController')

const checkObjectId = require('../middleware/checkObjectId')

const {likeItem} = require('../middleware/likeType')

const verifyJWT = require('../middleware/verifyJWT');

router.route('/:id').get(checkObjectId,itemController.getItem);
router.route('/:id/comments').get(checkObjectId,commentController.getComments);

router.use(verifyJWT);
router.route('/collections/:id/new/').post(checkObjectId,itemController.createItem);
router.route('/like').put(likeItem, likesController.toggleLikeItem);
router.route('/mini/:id').get(checkObjectId,collectionController.getCollectionMini);
router.route('/:id/comment').post(checkObjectId,commentController.postComment);
router.route('/:id').post(checkObjectId,itemController.updateItem);
router.route('/:id').delete(checkObjectId,itemController.deleteItem);

module.exports = router;
