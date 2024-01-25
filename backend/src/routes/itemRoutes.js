const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const likesController = require('../controllers/likesController');
const itemController = require('../controllers/itemController')
const commentController = require('../controllers/commentController')


const {likeItem} = require('../middleware/likeType')

const verifyJWT = require('../middleware/verifyJWT');

router.route('/:itemId').get(itemController.getItem);
router.route('/:itemId/comments').get(commentController.getComments);

router.use(verifyJWT);
router.route('/collections/:collectionId/new/').post(itemController.createItem);
router.route('/like').put(likeItem, likesController.toggleLikeItem);
router.route('/mini/:id').get(collectionController.getCollectionMini);
router.route('/:itemId/comment').post(commentController.postComment);
router.route('/:id').post(itemController.updateItem);
router.route('/:id').delete(itemController.deleteItem);

module.exports = router;
