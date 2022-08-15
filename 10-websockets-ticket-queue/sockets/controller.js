const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
	socket.emit('last-ticket', ticketControl.last);
	socket.emit('actual-state', ticketControl.lastFour);
	socket.emit('pending-ticket', ticketControl.tickets.length);

	socket.on('next-ticket', (_, callback) => {
		callback(ticketControl.next());
		socket.emit('pending-ticket', ticketControl.tickets.length);
		socket.broadcast.emit('pending-ticket', ticketControl.tickets.length);

		// socket.broadcast.emit('next-ticket', ticketControl.last);
	});

	socket.on('attend-ticket', ({ desktop }, callback) => {
		if (!desktop) return callback({ ok: false, msg: 'Desktop is required' });

		const attendTicket = ticketControl.attend(desktop);
		socket.broadcast.emit('actual-state', ticketControl.lastFour);
		socket.emit('pending-ticket', ticketControl.tickets.length);
		socket.broadcast.emit('pending-ticket', ticketControl.tickets.length);

		if (!attendTicket) return callback({ ok: false, msg: 'No ticket pendings' });

		callback({ ok: true, ticket: attendTicket });
	});
};

module.exports = { socketController };
