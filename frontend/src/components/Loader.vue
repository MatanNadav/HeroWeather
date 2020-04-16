<template>
    <section class="loader-container flex center">
        <section class="loader-svg-container flex column center">
            <img class="loader-svg" src="../assets/svg/Loader.svg" alt="Loader">
            <p class="loader-text" v-if=" counter === 0">Getting City's current weather</p>
            <p class="loader-text" v-if=" counter === 1">Searching for City's photos</p>
            <p class="loader-text" v-if=" counter >= 2">Updating interface</p>
        </section>
    </section>
</template>

<script>
export default {
    data() {
        return {
            counter: 0,
            interval: null
        }
    },
    computed: {

    },
    mounted() {
        this.interval = setInterval(() => {
            this.counter++
        },1200)
    },
    destroyed() {
        clearInterval(this.interval)
        this.counter = 0
    }
}
</script>

<style scoped>
    .loader-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: Black;
        z-index: 20;
    }
    .loader-svg-container {
        width: 45vw;
        height: 45vh;
    }
    .loader-svg {
        width: 50%;
        height: 50%;
    }
    .loader-text {
        color: chocolate;
        font-family: cursive;
        font-weight: 700;
        font-size: 1.2rem;

    }
</style>