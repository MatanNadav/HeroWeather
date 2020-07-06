const express = require('express')
const weatherController = require('./weather.controller')
const router = express.Router()
module.exports = router

router.get('/', weatherController.fetchWeather)
router.get('/updatedbforsho', weatherController.updateDB)


