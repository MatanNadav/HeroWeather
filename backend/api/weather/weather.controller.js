const weatherService = require('./weather.service')
const dbService = require('../../services/db.service')


module.exports = {
    fetchWeather,
    updateDB
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


async function updateDB() {
    try {
        console.log("inside controller");
        
        const res = await weatherService.updateDammit()
        console.log(res);
        
    }
    catch (err) {

    }
}