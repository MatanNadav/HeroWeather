const weatherService = require('./weather.service')


module.exports = {
    fetchWeather
}

async function fetchWeather(req, res) {
    let {q} = req.query
    
    try {
        let data = await weatherService.getWeather(q)
        res.json(data)
    }
    catch (err) {
        res.status('500').send('could not fetch weather')
    }
}