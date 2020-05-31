import Vue from 'vue'


Vue.filter('toCel', value => {
    let celsious = Math.round(value - 273.15)
    return celsious
})

Vue.filter('getDate', value => {
    let date = new Date(value * 1000).toUTCString()
    return date.substring(0, date.length - 12);
})