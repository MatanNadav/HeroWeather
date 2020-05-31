import Axios from 'axios'
const BASE_URL = process.env.NODE_ENV === "production" ? "/api/" : "//localhost:3000/api/"

var axios = Axios.create({
    withCredentials: true
})

export default {
    fetchCurrWeather,
    getPhotos,
    getWeatherIcon,
    getNextPage
}

async function fetchCurrWeather (query = 'London') {
    let q = `?q=${query}`;
    const res = await axios.get(`${BASE_URL}weather` + q);
    if(res.data) return res.data
    else {
        return null;
    }
        
}

async function getPhotos(query = 'London') {
    let q = `?q=${query}`;
    const res = await axios.get(`${BASE_URL}photos` + q)
    return res
}

async function getNextPage(query) {
    let {city, pageNum} = query
    let q = `?q=${city}&page=${pageNum}`
        
    const res = await axios.get(`${BASE_URL}photos` + q)
    return res
}


function getWeatherIcon(desc = "sun") {
    let descArr = desc.toLowerCase().split(" ")

    if (descArr[0] === "clear") return require('../assets/svg/Day.svg');
    else {
        let iconStr = ''
        descArr.forEach( str => {
            
            if (str.includes("part")) return iconStr += "part"
            else if (str.includes("sun")) return iconStr += "sun"
            else if (str.includes("cloud")) return iconStr += "cloud"
            else if (str.includes("rain") || str.includes("shower")) return iconStr += "rain"
            else if (str.includes("snow")) return iconStr += "snow"
        })
        
        if (iconStr === "partsun" || iconStr === "suncloud") return require('../assets/svg/SunCloud.svg');
        else if (iconStr === "sun") return  require('../assets/svg/Day.svg');
        else if (iconStr === "sunrain" || iconStr === "cloudrain" || iconStr === "partsunrain" || iconStr === "rain") {
            return require('../assets/svg/SunRain.svg');
        } 
        else if (iconStr === "sunsnow" || iconStr === "cloudsnow" || iconStr === "snow") return require('../assets/svg/SunSnow.svg');
        else return require('../assets/svg/SunCloud.svg');
    }
}
