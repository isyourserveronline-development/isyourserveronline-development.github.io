$(document).ready(function() {
	const serverList = $('#server-list');

	// Lista de servidores de Minecraft
	const servers = [
		{ name: 'Hypixel Network', domain: 'hypixel.net' },
		{ name: 'Kaory Network', domain: 'mc.kaory.xyz' },
		{ name: 'RedDevilsMC', domain: 'play.reddevilsmc.net'},
		{name: 'RyzenNet', domain: 'mc.ryzennet.xyz'}
	];

	// Función para obtener información del servidor
	const getServerInfo = (server) => {
		const url = `https://api.mcsrvstat.us/2/${server.domain}`;

		$.get(url, function(response) {
			let players = response.players.online;
			let maxPlayers = response.players.max;
			let connection = response.online ? 'Online' : 'Offline';

			serverList.append(`
				<tr>
					<td>${server.name}</td>
					<td>${server.domain}</td>
					<td>${players} / ${maxPlayers}</td>
					<td class="connection-${response.online ? 'online' : 'offline'}">${connection}</td>
				</tr>
			`);
		}).fail(function() {
			serverList.append(`
				<tr>
					<td>${server.name}</td>
					<td>${server.domain}</td>
					<td colspan="2" class="connection-offline">Offline</td>
				</tr>
			`);
		});
	};

	// Obtener información de cada servidor y mostrarla en la tabla
	servers.forEach(function(server) {
		getServerInfo(server);
	});
});
