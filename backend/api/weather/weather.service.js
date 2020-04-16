const axios = require('axios');

const APIKey = require("../../config/config.js").weatherKey

const locationAPI = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${APIKey}&q=`;
const conditionAPI = 'http://dataservice.accuweather.com/currentconditions/v1/';
const fiveDaysForecastAPI = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';

module.exports = {
    findLocation
}

async function findLocation(query = "London") {
    try {
        const res = await axios.get(locationAPI + query)
        const weather = await getCurrWeather(res.data[0].Key);
        const forecast = await getFiveDaysForecast(res.data[0].Key);
        const cityName = res.data[0].LocalizedName
        weather[0].isFavorite = null;
        return {weather, forecast, cityName}
        
    }
    catch (err) {
        console.warn('something went wrong at fetching location', err);
        throw err 
    }
}


async function getCurrWeather (locKey=328328) {
    try {
        const res =  await axios.get(`${conditionAPI}${locKey}?apikey=${APIKey}`)
        return res.data
    }
    catch (err) {
        console.warn('something went wrong in getting current weather', err)
        throw err
    }    

}

async function getFiveDaysForecast(locKey=328328) {
    try {
        const res = await axios.get(`${fiveDaysForecastAPI}${locKey}?apikey=${APIKey}&details=false&metric=true`)
        return res.data;
    }
    catch (err) {
        console.warn('No forecast from server', err);
        throw err
    }

}