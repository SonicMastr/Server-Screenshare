module.exports = (server, g) => {
    server.info('Joined Server: ' + g.name)
    server.hook.send('', {
		'username': 'Server Screenshare',
		'avatarURL': server.user.avatarURL(),
		'embeds': [{
			'color': 16777215,
			'description': 'Joined a server!',
			'timestamp': new Date(),
			'fields': [{
				'name': 'Guild Name',
				'value': g.name,
			}],
		}],
	});
};