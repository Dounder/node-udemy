const fs = require('fs')
const colors = require('colors')

const createTableFile = async ({ b = 5, l, u }) => {
	try {
		let out = ''

		for (let i = 1; i <= u; i++) out += `${b} x ${i} = ${b * i}\n`

		if (l) {
			console.log('================'.rainbow)
			console.log('   Table of'.red, b.toString().red)
			console.log('================'.rainbow)
			console.log(out.toString().random)
		}

		fs.writeFileSync(`table-${b}.txt`, out)

		return `table-${b}.txt`
	} catch (error) {
		throw error
	}
}

module.exports = { createTableFile }
