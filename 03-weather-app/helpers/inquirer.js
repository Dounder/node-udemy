require('colors')
const inquirer = require('inquirer')

const questions = [
	{
		type: 'list',
		name: 'option',
		message: 'Select an option:',
		choices: [
			{ value: 1, name: `${'1.'.green} Search city` },
			{ value: 2, name: `${'2.'.green} History` },
			{ value: 0, name: `${'0.'.green} Exit` },
		],
	},
]

const inquirerMenu = async () => {
	console.clear()
	console.log('======================='.green)
	console.log('   Select an option:   '.white)
	console.log('=======================\n'.green)

	const { option } = await inquirer.prompt(questions)

	return option
}

const pause = async () => {
	const question = [
		{ type: 'input', name: 'question', message: `Press ${'ENTER'.green} to continue` },
	]
	console.log('\n')
	await inquirer.prompt(question)
}

const readInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate: (value) => (value.length === 0 ? `Enter a valid description`.red : true),
		},
	]
	const { desc } = await inquirer.prompt(question)
	return desc
}

const listPlaces = async (places = []) => {
	const choices = places.map(({ id, name }, idx) => {
		idx = `${idx + 1}.`.green
		return { name: `${idx} ${name}`, value: id }
	})

	choices.push({ name: `${'0.'.green} Cancel`, value: 0 })

	const question = [
		{
			type: 'list',
			name: 'id',
			message: 'Select a place: ',
			choices,
		},
	]
	const { id } = await inquirer.prompt(question)
	return id
}

const confirm = async (message) => {
	const question = [{ type: 'confirm', name: 'ok', message }]
	const { ok } = await inquirer.prompt(question)
	return ok
}

const tasksListToComplete = async (tasks = []) => {
	const choices = tasks.map((task, idx) => {
		idx = `${idx + 1}.`.green
		return { name: `${idx} ${task.desc}`, value: task.id, checked: !!task.completed }
	})

	const question = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Select tasks to delete:',
			choices,
		},
	]
	const { ids } = await inquirer.prompt(question)
	return ids
}

module.exports = { inquirerMenu, pause, readInput, listPlaces, confirm, tasksListToComplete }
