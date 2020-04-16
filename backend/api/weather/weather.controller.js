const weatherService = require('./weather.service')


module.exports = {
    fetchWeather
}

async function fetchWeather(req, res) {
    let {q} = req.query
    
    try {
        let data = await weatherService.findLocation(q)
        let {weather, forecast, cityName} = data
        res.json({weather, forecast, cityName})
    }
    catch (err) {
        res.status('500').send('could not fetch weather')
    }
}