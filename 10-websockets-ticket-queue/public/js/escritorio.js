// HTML References
const lblPendientes = document.querySelector('#lblPendientes');
const lblDesktop = document.querySelector('h1');
const lblLastTicket = document.querySelector('small');
const attendButton = document.querySelector('button');
const alertDiv = document.querySelector('.alert');

const params = new URLSearchParams(window.location.search);

if (!params.has('escritorio')) {
	window.location = 'index.html';
	throw new Error("Desktop doesn't exist");
}

const desktop = params.get('escritorio');
lblDesktop.innerText = desktop;

alertDiv.style.display = 'none';

const socket = io(); // socket.io

socket.on('connect', () => {
	attendButton.disabled = false;
});

socket.on('disconnect', () => {
	attendButton.disabled = true;
});

socket.on('pending-ticket', (payload) => {
	lblPendientes.innerText = payload;
});

attendButton.addEventListener('click', () => {
	socket.emit('attend-ticket', { desktop }, ({ ok, msg, ticket }) => {
		if (!ok) {
			lblLastTicket.innerText = `nadie...`;
			return (alertDiv.style.display = '');
		}

		lblLastTicket.innerText = `Ticket ${ticket.number}`;
	});
});
