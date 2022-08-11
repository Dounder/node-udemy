const fs = require('fs')
const mapbox = require('../apis/mapbox')
const openWeather = require('../apis/openWeather')

class Search {
	history = []
	dbPath = './db/history.json'

	constructor() {
		this.getHistory()
	}

	get getCapitalizedHistory() {
		return this.history.map((place) =>
			place
				.split(' ')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ')
		)
	}

	async searchCities(city = '') {
		console.clear()
		try {
			const { data } = await mapbox.get(`/${city}.json`)

			return data.features.map((place) => ({
				id: place.id,
				name: place.place_name,
				lng: place.center[0],
				lat: place.center[1],
			}))
		} catch (error) {
			return []
		}
	}

	async getWeather(lat, lon) {
		try {
			const { data } = await openWeather.get('', { params: { lat, lon } })
			const { weather, main } = data

			return {
				desc: weather[0].description,
				temp: main.temp,
				min: main.temp_min,
				max: main.temp_max,
			}
		} catch (error) {
			console.error(error)
		}
	}

	addHistory(place = '') {
		if (this.history.includes(place.toLowerCase())) return

		this.history.unshift(place.toLowerCase())

		this.saveHistory()
	}

	saveHistory() {
		const payload = this.history
		fs.writeFileSync(this.dbPath, JSON.stringify(payload))
	}

	getHistory() {
		if (!fs.existsSync(this.dbPath)) return []

		const payload = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })

		this.history = JSON.parse(payload)
	}
}

module.exports = Search
