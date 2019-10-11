module.exports = (server, g) => {
    server.info('Left Server: ' + g.name)
    server.hook.send('', {
		'username': 'Server Screenshare',
		'avatarURL': server.user.avatarURL(),
		'embeds': [{
			'color': 16777215,
			'description': 'Left a Server :(',
			'timestamp': new Date(),
			'fields': [{
				'name': 'Guild Name',
				'value': g.name,
			}],
		}],
	});
};