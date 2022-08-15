const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const button = document.querySelector('#btnSend');

const socket = io();

socket.on('connect', () => {
	lblOffline.style.display = 'none';
	lblOnline.style.display = '';
});

socket.on('disconnect', () => {
	lblOnline.style.display = 'none';
	lblOffline.style.display = '';
});

socket.on('send-message', (payload) => {
	console.log(payload);
});

button.addEventListener('click', () => {
	const payload = {
		message: txtMessage.value,
		id: '123abc',
		timestamp: new Date().getTime(),
	};

	socket.emit('send-message', payload, (payload) => {
		console.log('Callback from server: ', payload);
	});
});
