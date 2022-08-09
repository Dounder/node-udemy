const fs = require('fs')

const fileName = './db/data.json'

const saveDb = (data) => {
	fs.writeFileSync(fileName, JSON.stringify(data))
}

const readDb = () => {
	if (!fs.existsSync(fileName)) return null

	const data = fs.readFileSync(fileName, { encoding: 'utf-8' })

	return JSON.parse(data)
}

module.exports = { saveDb, readDb }
