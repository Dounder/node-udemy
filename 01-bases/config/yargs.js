const argv = require('yargs')
	.options({
		b: { alias: 'base', demandOption: true, describe: 'Base to multiply', type: 'number' },
		l: { alias: 'list', default: false, describe: 'List the result', type: 'boolean' },
		u: { alias: 'until', default: 10, describe: 'Max number to multiply', type: 'number' },
	})
	.check((argv) => {
		if (isNaN(argv.b)) throw new Error('Base must be a number')

		return true
	}).argv

module.exports = argv
