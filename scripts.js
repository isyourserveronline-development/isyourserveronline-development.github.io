const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const status = document.querySelector('#status');

// Recupera el valor del parámetro "ip" de la URL
const urlParams = new URLSearchParams(window.location.search);
const ip = urlParams.get('ip');

// Si se proporcionó una dirección IP en la URL, insertarla automáticamente en el campo de búsqueda,
if (ip) {
   document.getElementById('server-ip').value = ip;
}

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const serverIP = input.value;

	fetch(`https://api.mcsrvstat.us/2/${serverIP}`)
		.then((response) => response.json())
		.then((data) => {
			if (data.online) {
				const players = `${data.players.online}/${data.players.max}`;
				const motd = data.motd.clean[0];
				status.innerHTML = `
					<div class="server-status">
						<p>Server Status <span class="online">Online</span></p>
						<p>Players Online: ${players}</p>
					</div>
					<div class="server-motd">
						<p>MOTD: ${motd}</p>
					</div>
				`;
			} else {
				status.innerHTML = `
					<div class="server-status">
						<p>Server Status <span class="offline">Offline</span></p>
					</div>
				`;
			}
		})
		.catch((error) => {
			status.textContent = 'Unknown Error..';
			console.error(error);
		});

});
