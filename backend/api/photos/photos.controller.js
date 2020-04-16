const photosService = require('./photos.service')


module.exports = {
    fetchPics
}


async function fetchPics(req, res) {
    let {q} = req.query;
    let {page} = req.query
    try {
        let data = await photosService.fetcPhotos(q, page)
        res.json(data)
    }
    catch (err) {
        res.status('500').send('could not fetch photos')
    }
}
