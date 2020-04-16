const axios = require('axios');

const photosAPI = require("../../config/config.js").photoKey
const config = {
    headers: {'Authorization': photosAPI} 
}

module.exports = {
    fetcPhotos
}


async function fetcPhotos(query = "London", pageNum = "1") {
    try {
        const res = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=10&page=${pageNum}`, config)
        return res.data
    }
    catch (err) {
        console.warn('something went wrong', err);
        throw err 
    }
}
