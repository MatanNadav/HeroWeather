<template>
    <section class="forecast-preview-container flex column" >
        <div class="forecast-animation-container">
            <img class="forecast-animation" :src="getDayIcon" alt="Day Icon">
        </div>
    
        <section class="forecast-text-container flex column space-around">
            <h5 class="forecast-title">{{day.desc}}</h5>
            <p class="forecast-text">{{day.date | getDate}}</p>
            <p class="forecast-text temp">High: {{day.max | toCel}}</p>
            <p class="forecast-text temp">Low: {{day.min | toCel}}</p>
        </section>
    </section>
</template>

<script>
import weatherService from "@/services/WeatherService"

export default {
    props: ['day'],
    computed: {
        getDayIcon() {
            let desc = this.day.desc.toLowerCase()
            return weatherService.getWeatherIcon(desc)
        }
    }
}
</script>

<style scoped>
    .forecast-preview-container {
        width: 70%;
        height: 100%;
        border-radius: 5px;
        box-shadow: inset 0px -14px 40px 16px rgba(0,0,0,0.75);
    }
    @media screen and (max-width: 560px) {
        .forecast-preview-container {
            width: 80%;
        }
    }
    .forecast-preview-container:hover {
        background: whitesmoke;
        opacity: 0.8;
    }
    
    .forecast-text-container {
        width: 88%;
        height: 100%;
        margin: 0 auto;

    }

    .forecast-animation-container {
        width: 100%;
        height: 45%;
    }
    .forecast-animation {
        width: inherit;
    }

    .forecast-title, .forecast-text {
        display: inline-block;
        padding: 0;
        margin: 0;
    }
    .forecast-text {
        font-size: 1.1rem;
    }
    .forecast-title {
        margin: 0 auto;
        font-size: 1rem;
    }
    .temp::after {
        content: "\00b0";
    }
    </style>