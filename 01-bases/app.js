const { createTableFile } = require('./helpers/multiply')
const argv = require('./config/yargs')
const colors = require('colors')

console.clear()

createTableFile({ ...argv })
	.then((file) => console.log(file.rainbow, 'created'.trap))
	.catch((error) => console.log(error))
