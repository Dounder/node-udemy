const axios = require('axios')

const openWeather = axios.create({
	baseURL: 'https://api.openweathermap.org/data/2.5/weather',
	params: {
		appid: process.env.OPEN_WEATHER_TOKEN,
		units: 'metric',
		lang: 'es',
	},
})

module.exports = openWeather
