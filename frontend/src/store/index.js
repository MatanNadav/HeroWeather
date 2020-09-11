import Vue from 'vue'
import Vuex from 'vuex'
import weatherService from '../services/WeatherService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filterBy: {
        txt: 'London'
    },
    currWeather: {},
    currForecast: {},
    currCity: '',
    cityPhotos: [],
    nextPageNum: null,
    isLoading: false
  },
  getters: {
    weatherForDisplay(state) {
      return state.currWeather;
    },
    forecastForDisplay(state) {
      return state.currForecast
    },
    getCityName(state) {
      return state.currCity;
    },
    getCityPhotos(state) {
      return state.cityPhotos
    },
    photosForDisplay(state) {
      return state.cityPhotos
    },
    getBackgroundPhoto(state) {
      let rand = Math.floor(Math.random() * state.cityPhotos[0].length)
      return state.cityPhotos[0][rand]
    },
    getLoading(state) {
      return state.isLoading;
    }
  },
  mutations: {
    setStoreFilter(state, txt) {
      state.filterBy = {txt}
    },
    setCurrWeather(state, {res}) {
      state.currWeather = res;
    },
    setCurrForecast(state, {forecast}) {
      state.currForecast = forecast;        
    },
    setCurrCity(state, {cityName}) {
      state.currCity = cityName
    },
    setCityPhotos(state, {photos}) {
      state.cityPhotos = []
      state.cityPhotos.push(photos.data.photos)
    },
    setLoading(state, {isLoading}){
      state.isLoading = isLoading
    },
    addCityPhotos(state, {photos}){
      photos.data.photos.forEach( photo => {
        state.cityPhotos[0].push(photo)
      })
    },
    setNextPageNum(state) {
      if (!state.nextPageNum)  {
        state.nextPageNum = 2
      }
      else {
        state.nextPageNum++
      }
    }
  },
  actions: {
      async loadWeather(context) {
        context.commit({ type: 'setLoading', isLoading: true })
        const res = await weatherService.fetchCurrWeather(context.state.filterBy.txt)
        if(!res) {
          context.commit({ type: 'setLoading', isLoading: false })
          return
        }

        const {forecast} = res

        context.commit({ type: "setCurrWeather", res })
        context.commit({ type: "setCurrForecast", forecast })
        context.commit({ type: "setCurrCity", cityName: res.name })
      },
      async fetchPhotos(context) {
        const photos = await weatherService.getPhotos(context.state.filterBy.txt)
        if(!photos) return
        context.commit({ type: "setCityPhotos", photos })
        context.commit({ type: "setNextPageNum" })
      },
      async fetchNextPage(context) {
        if (context.state.nextPageNum > 10) return
        let query = {city: context.state.filterBy.txt, pageNum: context.state.nextPageNum}
        const photos = await weatherService.getNextPage(query)
        context.commit({ type: "setNextPageNum" })
        context.commit({ type: "addCityPhotos", photos })
      }
  }

})
