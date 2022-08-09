const { v4: uuid } = require('uuid')

class Task {
	id = ''
	desc = ''
	completed = null

	constructor(desc) {
		this.id = uuid()
		this.desc = desc
		this.completed = null
	}
}

module.exports = Task
