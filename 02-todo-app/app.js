require('colors')
const {
	inquirerMenu,
	pause,
	readInput,
	tasksListToDelete,
	confirm,
	tasksListToComplete,
} = require('./helpers/inquirer')
const { readDb, saveDb } = require('./helpers/saveFile')
const Tasks = require('./models/tasks')

const main = async () => {
	let opt = ''
	const tasks = new Tasks()

	const data = readDb()
	data && tasks.loadTasks(data)

	do {
		opt = await inquirerMenu() // Print menu and get option

		switch (opt) {
			case '1':
				const desc = await readInput('Enter a description: ') // Get description from user
				tasks.createTask(desc) // Create task
				break

			case '2':
				tasks.listAllTasks() // Print list of tasks
				break

			case '3':
				tasks.listCompletedPendingTasks(false) // Print list of completed and pending tasks
				break

			case '4':
				tasks.listCompletedPendingTasks(true) // Print list of pending and completed tasks
				break

			case '5':
				const ids = await tasksListToComplete(tasks.tasksList) // Get list of tasks to complete
				tasks.toggleTasks(ids) // Complete tasks
				break

			case '6':
				const id = await tasksListToDelete(tasks.tasksList) // Get list of tasks to delete
				if (id !== 0) {
					const ok = await confirm(`Are you sure you want to delete task?`) // Confirm delete
					ok && tasks.deleteTask(id) // Delete task
					console.log(`Task deleted`.green)
				}
				break
		}

		saveDb(tasks.tasksList) // Save tasks to file

		await pause()
	} while (opt !== '0')
}

main()
