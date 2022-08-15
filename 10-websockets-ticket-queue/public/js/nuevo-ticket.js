// HTML References
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const button = document.querySelector('button');

const socket = io(); // socket.io

socket.on('connect', () => {
	button.disabled = false;
});

socket.on('disconnect', () => {
	button.disabled = true;
});

socket.on('last-ticket', (payload) => {
	lblNuevoTicket.innerText = `Ticket ${payload}`;
});

button.addEventListener('click', () => {
	socket.emit('next-ticket', null, (ticket) => {
		lblNuevoTicket.innerText = ticket;
	});
});
