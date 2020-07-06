const axios = require('axios');
const db = require('../../services/db.service');
const dbService = require('../../services/db.service');
const APIKey = require("../../config/config.js").keys.weatherKey

const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?appid=${APIKey}&q=`

module.exports = {
    getWeather,
    updateDammit
}


async function getWeather(query = "London", isConnectToAPI = false) {
    try {
        if (!isConnectToAPI) {
            let dbRes = await db.interactWithDB(null, query, "getWeatherData")
            if (dbRes.weather[0]) {
                const data = {
                    weather:dbRes.weather[0],
                    forecast: dbRes.forecast
                }
                return data
            }
        }
        
        const res = await axios.get(weatherAPI + query)
        const city = { id: res.data.id ,coord: res.data.coord, name: res.data.name}
        const weatherData = await getWeatherData(city.coord)
        const formattedData = formatData(weatherData, city)
        return formattedData
    }
    catch (err) {
        console.warn('Something went wrong at fetching weather', err)
        throw err
    }
}

async function getWeatherData(coord) {
    try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly&appid=${APIKey}`)
        return res.data
    }
    catch (err) {
        console.warn('Something went wrong at fetching weather', err)
        throw err
    }
}

function formatData(weatherData, city) {
    
    const data = {
        weather: {
            id: city.id,
            name: city.name,
            date: weatherData.current.dt,
            temperature: weatherData.current.temp,
            feelsLike: weatherData.current.feels_like,
            mainDesc: weatherData.current.weather[0].main,
            desc: weatherData.current.weather[0].description,
            icon: weatherData.current.weather[0].icon,
        },
        forecast: weatherData.daily.map( (daily, i) => {
            if (i === 0) return
            return {
                id: city.id,
                name: city.name,
                date: daily.dt,
                tempDay: daily.temp.day,
                tempNight: daily.temp.night,
                min: daily.temp.min,
                max: daily.temp.max,
                desc: daily.weather[0].main
            }
        })
    }
    data.forecast.splice(0, 1)
    return data
}


async function updateDammit() {
    try {
        console.log("inside dammit");
        
        const res = await dbService.insertoToDB()
        console.log(res);
        

    } 
    catch (err) {
        throw err
    }
}