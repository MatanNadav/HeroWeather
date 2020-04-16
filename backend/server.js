const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000;

const app = express()


app.use(bodyParser.json());
app.use(express.static( 'public' ));

if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: 'http://localhost:8080',
        credentials: true
    };
    app.use(cors(corsOptions));
}

const weatherRoute = require('./api/weather/weather.route')
const photosRoute = require('./api/photos/photos.route')

app.use('/api/weather', weatherRoute)
app.use('/api/photos', photosRoute)



app.listen(port,
    () => console.log(`HeroWeather listening on port ${port}!`))