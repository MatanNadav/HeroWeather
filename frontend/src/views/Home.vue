<template>
   <section class="home-container" v-if="!isLoading">
        <AppHeader @emit-filter="setFilter"></AppHeader>
        <WeatherPreview :weather="weatherForDisplay" :forecast="forecastForDisplay" :cityName="cityNameToRender"></WeatherPreview>
       <section class="photos-list-container" >
            <PhotosList :photos="photosForDisplay"></PhotosList>
       </section>
   </section>
</template>

<script>
import AppHeader from "@/components/AppHeader"
import WeatherPreview from "@/components/WeatherPreview"
import PhotosList from "@/components/PhotosList"

export default {
    data(){
        return {
            isLoading: false,
        }
    },

    computed: {
        weatherForDisplay() {
            let weather = this.$store.getters.weatherForDisplay
            return weather[0]
        },
        forecastForDisplay() {
            let forecast =  this.$store.getters.forecastForDisplay
            return forecast
        },
        cityNameToRender() {
            return this.$store.getters.getCityName;
        },
        photosForDisplay() {
            let photos = this.$store.getters.photosForDisplay
            return photos[0]           
            
        }
    },
    methods: {
        async loadWeather(){
            this.isLoading = true
            await this.$store.dispatch({ type: "loadWeather" })
            await this.$store.dispatch({ type: "fetchPhotos" })
            this.isLoading = false
        },
        async setFilter(filterBy) {
            this.isLoading = true
            this.$store.commit('setStoreFilter', filterBy.txt)
            this.loadWeather()
            this.isLoading = false
        },
    },
    created(){
        this.loadWeather()
    },
    components: {
        AppHeader,
        WeatherPreview,
        PhotosList
    }
}
</script>

<style scoped>
    .home-container {
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -2;
        background-color:whitesmoke;
    }
    .photos-list-container {
        width: 100%;
        height: auto;
        margin-top: 10%;
    }
</style>
