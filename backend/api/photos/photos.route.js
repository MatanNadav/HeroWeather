const express = require('express')
const photosController = require('./photos.controller')
const router = express.Router()
module.exports = router

router.get('/', photosController.fetchPics)