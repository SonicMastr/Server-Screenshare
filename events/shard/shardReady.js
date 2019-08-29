module.exports = (server, id) => {
    server.info(`Started Shard ${id}`);
    server.hook.send('', {
        'username': 'Server Screenshare',
        'avatarURL': server.user.avatarURL(),
        'embeds': [{
            'color': 16777215,
            'timestamp': new Date(),
            'fields': [{
                'name': `Shard ${id}`,
                'value': 'Shard Started',
            }],
        }],
    })
}