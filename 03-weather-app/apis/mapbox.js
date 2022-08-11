const { default: axios } = require('axios')

const mapbox = axios.create({
	baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
	params: {
		limit: 5,
		language: 'es',
		access_token: process.env.MAPBOX_TOKEN,
	},
})

module.exports = mapbox
