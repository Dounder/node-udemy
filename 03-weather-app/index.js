require('dotenv').config()
const { inquirerMenu, pause, readInput, listPlaces } = require('./helpers/inquirer')
const Search = require('./models/Search')

const main = async () => {
	const searchs = new Search()
	let opt

	do {
		opt = await inquirerMenu()

		switch (opt) {
			case 1:
				// Search city
				const term = await readInput('Enter a city: ')

				// Show places
				const places = await searchs.searchCities(term)

				// Select place
				const selectedId = await listPlaces(places)
				if (selectedId === 0) continue

				// Save history
				const { name, lat, lng } = places.find((place) => place.id === selectedId)
				searchs.addHistory(name)

				// Get weather
				const { desc, temp, min, max } = await searchs.getWeather(lat, lng)

				// Show place and weather info
				console.clear()
				console.log('\nCity information:\n'.green)
				console.log('City: '.grey, name)
				console.log('Lat: '.grey, lat)
				console.log('Lng: '.grey, lng)
				console.log('Temperature: '.grey, temp)
				console.log('Min: '.grey, min)
				console.log('Max: '.grey, max)
				console.log('The weather is: '.grey, desc)
				break
			case 2:
				// List history
				console.clear()
				searchs.getCapitalizedHistory.forEach((place, idx) => {
					idx = `${idx + 1}`.green
					console.log(`${idx}. ${place}`)
				})
				break
		}

		opt !== 0 && (await pause())
	} while (opt !== 0)
}

main()
