const axios = require('axios');
const db = require('../../services/db.service.js')
const APIKey = require("../../config/config.js").config.weatherKey

const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?appid=${APIKey}&q=`

module.exports = {
    getWeather
}


async function getWeather(query = "London", isConnectToAPI = false) {
    if (!isConnectToAPI) {
        const dbRes = await db.getWeatherDataFromDB(query)
        if (dbRes) return dbRes
    }
    try {
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
            temp: weatherData.current.temp,
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
                desc: daily.weather[0].main,
                icon: daily.weather[0].icon
            }
        })
    }
    data.forecast.splice(0, 1)
    return data
}