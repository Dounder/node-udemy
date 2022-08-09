require('colors')

const showMenu = () =>
	new Promise((res) => {
		console.clear()
		console.log('======================='.green)
		console.log('   Select an option:   '.yellow)
		console.log('=======================\n'.green)

		console.log(`${'1.'.green} Create task`)
		console.log(`${'2.'.green} List tasks`)
		console.log(`${'3.'.green} List completed tasks`)
		console.log(`${'4.'.green} List pending tasks`)
		console.log(`${'5.'.green} Complete task(s)`)
		console.log(`${'6.'.green} Delete task(s)`)
		console.log(`${'0.'.green} Exit`)

		const readline = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout,
		})

		readline.question(`\nSelect an ${'option:'.green} `, (opt) => {
			res(opt)
			readline.close()
		})
	})

const pause = () =>
	new Promise((res) => {
		const readline = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout,
		})

		readline.question(`\nPress ${'ENTER'.green} to continue\n`, () => {
			readline.close()
			res()
		})
	})

module.exports = { showMenu, pause }
