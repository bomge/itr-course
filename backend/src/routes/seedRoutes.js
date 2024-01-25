const express = require('express')
const router = express.Router()
const seedController = require('../controllers/seedController')

router.route('/collectionTypes').post(seedController.seedTypes)
// router.route('/collections').get(authController.refresh)
// router.route('/items').post(authController.logout)
// router.route('/register').post(authController.register)

module.exports = router
