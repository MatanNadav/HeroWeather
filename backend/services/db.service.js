const mysql = require('mysql2/promise')
const config = require('../config/config.js')
const schedule = require('node-schedule')
const citiesListInDB = require("../data/cities.data")

const weatherService = require("../api/weather/weather.service")

module.exports = {
    interactWithDB,
    insertoToDB
}



async function interactWithDB(data = null, query = "London", action = "getWeatherData") {
    const db = await mysql.createConnection({
        "host"     : config.dbKeys.host,
        "port": config.dbKeys.port,
        "user"     : config.dbKeys.user,
        "password" : config.dbKeys.password,
        "database" : config.dbKeys.database
    })
    
    switch(action) {
        case "getWeatherData":
            const weatherData = await db.execute("SELECT * FROM current WHERE name = ?", [query])
            const forecastData = await db.execute("SELECT * FROM forecast WHERE name = ?", [query])
            return {weather:weatherData[0], forecast:forecastData[0]}
        case "updateWeatherData":
            const updatedWeather = await db.query("UPDATE current SET date = ?, temperature = ?, feels_like = ?, main_desc = ?, desc = ?, icon = ? WHERE id = ?", [data.date, data.temp, data.feelsLike, data.mainDesc, data.desc, data.icon, data.id]);
            return updatedWeather[0]
            
        case "updateForecastData":
            data.forEach(day, async () => {
                await db.execute("UPDATE forecast SET date = ?, max_temp = ?, min_temp = ?, main_desc = ?, desc = ?, icon = ? WHERE id = ?", [day.date, day.maxTemp, day.minTemp, day.mainDesc. day.desc, day.icon, day.id])
            })
            break;
        case "insertDataToDb":
            await db.execute("INSERT INTO current values(id = ?, name = ?, date = ?, temperature = ?, feels_like = ?, main_desc = ?, desc = ?, icon = ?)", [data.weather.id, data.weather.name, data.weather.date, data.weather.temperature, data.weather.feelsLike, data.weather.mainDesc, data.weather.desc, data.weather.icon])
            data.forecast.forEach( async day => {
                await db.execute("INSERT INTO forecast values(id = ?, name = ?, date = ?, max_temp = ?, min_temp = ?, main_desc = ?, desc = ?, icon = ?)",[day.id, day.name, day.date, day.max_temp, day.min_temp, day.desc, day.desc, data.weather.icon])
            })
            break;
            
            
    }
}


async function insertoToDB() {
    
    try {
        console.log("inside insertToDB");
        citiesListInDB.cities.forEach( async (city) => {
            const res = await weatherService.getWeather(city, true)
            console.log("got it after?", res);
            
            await interactWithDB(res, "", "insertDataToDb")
        })
    }
    catch (err) {
        throw err
    }
}

// daily updating the db at 3:00 AM with new data from API
const updateTables = schedule.scheduleJob('0 0 3 * * *', () => {
    citiesListInDB.forEach( async city => {
        const res = await weatherService.getWeather(city, true)
        await interactWithDB(weather, "updateWeatherData")
        await interactWithDB(forecast, "updateForecastData")
        
    })
})

// function formatWeatherValues(vals) {
//     return {
//         id: vals.id,
//         date: vals.date,
//         temp: vals.temp,
//         feelsLike: vals.feelsLike,
//         mainDesc: vals.mainDesc,
//         desc: vals.desc,
//         icon: vals.icon
//     }
// }

// function formatForecastValues(vals) {
//     return vals.forecast.map( daily => {
//         return {
//             id: daily.id,
//             date: daily.date,
//             min: daily.min,
//             max: daily.max,
//             mainDesc: daily.main,
//             desc: daily.desc,
//             icon: daily.icon
//         }
//     })
// }