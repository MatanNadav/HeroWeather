const axios = require('axios');
const dbService = require('../../services/db.service');
const config = require("../../config/config.js")
const citiesList = require("../../data/cities.data").cities
const schedule = require('node-schedule')
const COLLECTION_KEY = require('../../config/config.js').collection_key


const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?appid=${config.keys.weatherKey}&q=`

module.exports = {
    getWeatherFromApi,
    getWeatherFromDb,
}


async function getWeatherFromDb(query = 'london') {
    const collection = await dbService.getCollection(COLLECTION_KEY)
    if (collection) {
        try {
            let criteria = {}
            const regex = new RegExp(query)
            criteria.name = {$regex: regex, $options: 'i'}
            const weatherRes = await collection.find(criteria).toArray()
            if (!weatherRes[0]) {
                let res = await getWeatherFromApi(query)
                if (!res) {
                    let data = await getWeatherFromApi()
                    return data
                }
                else {
                    return res
                }
            }
            else {
                return weatherRes
            }
        }
        catch (err) {
            console.warn('Something went wrong at fetching weather', err)
            throw err
        }
    }
    else {
        let res = await getWeatherFromApi(query)
        return res
    }
}

async function getWeatherFromApi(query = "london") {
    try {
        const res = await axios.get(weatherAPI + query)
        const city = { id: res.data.id ,coord: res.data.coord, name: res.data.name }
        const weatherData = await getWeatherData(city.coord)
        const formattedData = formatData(weatherData, city)
        return formattedData
    }
    catch (err) {
        console.warn('Something went wrong at fetching weather')
        // throw err
    }
}


async function getWeatherData(coord) {
    try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly&appid=${config.keys.weatherKey}`)
        return res.data
    }
    catch (err) {
        console.warn('Something went wrong at fetching weather', err)
        throw err
    }
}

function formatData(weatherData, city) {
    
    const data = {
        id: city.id,
        name: city.name,
        date: weatherData.current.dt,
        temp: weatherData.current.temp,
        feels_like: weatherData.current.feels_like,
        main_desc: weatherData.current.weather[0].main,
        short_desc: weatherData.current.weather[0].description,
        forecast: weatherData.daily.map( (daily, i) => {
            if (i === 0) return
            return {
                id: city.id,
                name: city.name,
                date: daily.dt,
                min_temp: daily.temp.min,
                max_temp: daily.temp.max,
                desc: daily.weather[0].main
            }
        })
    }
    data.forecast.splice(0, 1)
    return data
}



// daily updating the db at 3:00 AM with new data from API
const updateDB = schedule.scheduleJob('0 0 3 * * *', () => {
    try {
        citiesList.forEach( async city => {
            const res = await getWeatherFromApi(city)
            await dbService.updateDB(res)
            
        })
    } catch(err) {
        console.warn(err)
        throw err
    }
   
})