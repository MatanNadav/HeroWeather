<template>
    <section class="weather-preview-container" v-if="weather">
        <section class="weather-head-container flex align-center space-around">
                <img class="svg-background" :src="getIcon" alt="SVG">
                <img class="background-city" :src="getBackground" alt="background" @load="emitPictureLoaded">

            <div class="head-details-container flex column space-around">
                <p class="city-name temperature-container">{{cityName}} - {{weather.temp | toCel}}</p>
                <p class="weather-text">{{weather.main_desc}} - {{weather.date | getDate}}</p> 

            </div>
        </section>

        <section class="forecast-container">
            <ForecastPreview v-for="day in forecast" :day="day" :key="day.date"></ForecastPreview>
        </section>

    </section>
    <section v-else>
        <p class="city-name" >Choose a location</p>
    </section>
</template>

<script>
import weatherService from "@/services/WeatherService"
import ForecastPreview from "@/components/ForecastPreview"

export default {
    props: {
        weather: Object,
        forecast: Array,
        cityName: String,
    },
    computed: {
        getIcon() {
            let desc = this.weather.main_desc
            return weatherService.getWeatherIcon(desc)
        },
        getBackground() {
            let data = this.$store.getters.getBackgroundPhoto
            let url = data.src.original
            return url + `?auto=compress&cs=tinysrgb&fit=crop&h=${screen.height}&w=${screen.width}`
        }
    },
    methods: {
        emitPictureLoaded() {
            this.$emit('pic-loaded')   
        },
        handleIntersect(entries) {
            if (entries[0].isIntersecting) {
                console.log('fired from preview')
                this.$store.dispatch({ type: "disableButton" })
            }
            else return
        },
    },
    components: {
        ForecastPreview,
    },
}
</script>

<style scoped>
    .weather-preview-container {
        width: 100%;
        height: auto;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 0.75fr 1fr;
        gap: 1px 1px;
    }
    .svg-background {
        width: 25%;
        height: 65%;
    }
    .forecast-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        gap: 25px 1px;
        justify-items: center;
        width: 80%;
        height: 100%;
        margin: 0px auto;
    }
    .head-details-container {
        height: 50%;
        width: 80%;
        font-size: 2rem;
    }
    .weather-details-container {
        width: inherit;
        height: inherit;
    }
    .weather-text {
        display: inline-block;
        padding: 0;
        margin: 0;
    }
    .temperature-container::after {
        content: "\00b0";
    }
    .city-name, .weather-text {
        padding: 0;
        margin: 0;
    }
    .background-city {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        opacity: 0.8;
        z-index: -10;
    }
    @media screen and (max-width: 560px) {
        .forecast-container {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            gap: 12px 0px;
            width: 90%;
        }
        .weather-head-container {
            flex-direction: column;
            justify-content: center;
        }
        .head-details-container {
            width: 60%;
            height: 25%;
        }
        .svg-background {
            width: 40%;
            height: 45%;
        }
    }
</style>