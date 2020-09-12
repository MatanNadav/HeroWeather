const axios = require('axios');

const photosAPI = require("../../config/config.js").keys.photoKey
const config = {
    headers: {'Authorization': photosAPI} 
}

module.exports = {
    fetcPhotos
}


async function fetcPhotos(query = "London", pageNum = "1") {
    try {
        const res = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${pageNum}`, config)
        if (!res.data.photos[0]) {
            let data = await fetchDefaultPhotos()
            return data
        }
        return res.data
    }
    catch (err) {
        console.warn('something went wrong', err);
        throw err 
    }
}

async function fetchDefaultPhotos() {
    try {
        const res = await axios.get(`https://api.pexels.com/v1/search?query=weather`, config)
        return res.data
    }
    catch (err) {
        console.warn('something went wrong', err);
        throw err 
    }
}

