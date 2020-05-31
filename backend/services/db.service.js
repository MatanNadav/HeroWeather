const mysql = require('mysql')
const dbConnConfig = require("../config/config.js").dbConfig
const db = mysql.createConnection({dbConnConfig});
const schedule = require('node-schedule')
const citiesListInDB = require("../data/cities.data.js").cities

const weatherService = require("../api/weather/weather.service")

module.exports = {
    getWeatherDataFromDB,
}

db.connect((err) => {
    if (err) throw err
    console.log("SQL database connected");
    
})


function getWeatherDataFromDB(name) {
    return new Promise((resolve, reject) => {
        let isCity = citiesListInDB.includes(name.toLowerCase())
        if (!isCity) return resolve(null)
        let sql = `SELECT * FROM weather WHERE name = ${name} UNION SELECT * FROM forecast WHERE name = ${name} `
        db.query(sql, (err, result) => {
            if (err)  return reject(err)
            return resolve(result) 
        })
    })
}

function updateWeatherRow(values) {
    let sql = `UPDATE weather SET date = ${values.date}, temp = ${values.temp}, feels_like = ${values.feelsLike}, main_desc = ${values.mainDesc}, desc = ${values.desc}, icon = ${values.icon} WHERE id = ${values.id}`
    db.query(sql, (err, result) => {
        if (err) throw err
        return result
    })
}

function updateForecastRow(values) {
    values.forEach( day => {
        let sql = `UPDATE forecast SET date = ${day.date}, min = ${day.min}, max = ${day.max}, desc = ${day.desc}, icon = ${day.icon} WHERE id = ${day.id} `
        db.query(sql, (err, result) => {
            if (err) throw err
            return result
        })
    })
   
}

const updateTables = schedule.scheduleJob('0 0 3 * * *', () => {
    citiesList.forEach( async city => {
        const res = await weatherService.getWeather(city, true)
        const weather = formatWeatherValues(res.weather)
        const forecast = formatForecastValues(res.forecast)
        updateWeatherRow(weather)
        updateForecastRow(forecast)
    })
})

function formatWeatherValues(vals) {
    return {
        id: vals.id,
        date: vals.date,
        temp: vals.temp,
        feelsLike: vals.feelsLike,
        mainDesc: vals.mainDesc,
        desc: vals.desc,
        icon: vals.icon
    }
}

function formatForecastValues(vals) {
    return vals.forecast.map( daily => {
        return {
            id: daily.id,
            date: daily.date,
            min: daily.min,
            max: daily.max,
            desc: daily.desc,
            icon: daily.icon
        }
    })
}
    

