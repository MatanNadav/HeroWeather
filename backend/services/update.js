const { getWeatherFromApi } = require('../api/weather/weather.service')
const { updateDB } = require('./db.service')
const citiesList = require('../data/cities.data').cities


async function scheduledJob() { // Scheduled job to update db every day with current weather
    let interval
    let idx = 0
    let weatherArray = []
    
    try {
        interval = setInterval( async () => {
            console.log(citiesList[idx], idx)
            if (citiesList[idx] === 'yo') {
                ++idx
                return;
            }
            let res = await getWeatherFromApi(citiesList[idx])
            weatherArray.push(res)
            if (++idx >= citiesList.length) {
                clearInterval(interval)
                await updateDB(weatherArray)
            }
        }, 700)
        
    } catch(err) {
        console.warn('unable to update at shedule',err)
        throw err
    }
}


scheduledJob()

