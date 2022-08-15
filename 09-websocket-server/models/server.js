const express = require('express');
var cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
	constructor() {
		//? Properties
		this.port = process.env.PORT;
		this.app = express();
		this.paths = {};
		this.server = require('http').createServer(this.app);
		this.io = require('socket.io')(this.server);

		//* Middlewares
		this.middlewares();

		//* Routes
		this.routes();

		//* Socket events
		this.sockets();
	}

	middlewares() {
		// Cors
		this.app.use(cors());
		// Serve static files from the public folder
		this.app.use(express.static('public'));
	}

	routes() {}

	sockets() {
		this.io.on('connection', socketController);
	}

	start() {
		this.server.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`);
		});
	}
}

module.exports = Server;
