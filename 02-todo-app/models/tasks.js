const Task = require('./task')

class Tasks {
	_list = {}

	get tasksList() {
		return Object.keys(this._list).map((item) => this._list[item])
	}

	constructor() {
		this._list = {}
	}

	loadTasks(task = []) {
		task.forEach((item) => (this._list[item.id] = item))
	}

	createTask(desc = '') {
		const task = new Task(desc)
		this._list[task.id] = task
	}

	listAllTasks() {
		this.tasksList.forEach(({ desc, completed }, idx) => {
			idx = `${idx + 1}.`.green

			console.log(`${idx} ${desc} :: ${completed ? 'COMPLETE'.green : 'PENDING'.red}`)
		})
	}

	listCompletedPendingTasks(pending = false) {
		let counter = 0
		this.tasksList.forEach(({ desc, completed }) => {
			if (!pending) {
				if (completed) {
					counter++
					console.log(`${counter.toString().green}. ${desc} :: ${completed}`)
				}
			} else {
				if (!completed) {
					counter++
					console.log(`${counter.toString().green}. ${desc} :: ${'PENDING'.red}`)
				}
			}
		})
	}

	deleteTask(id) {
		if (this._list[id]) delete this._list[id]
	}

	toggleTasks(ids = []) {
		ids.forEach((id) => {
			const task = this._list[id]
			!task.completed && (task.completed = new Date().toISOString())
		})

		this.tasksList.forEach((task) => {
			if (!ids.includes(task.id)) this._list[task.id].completed = null
		})
	}
}

module.exports = Tasks
