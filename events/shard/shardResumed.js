module.exports = (server, id) => {
    server.info(`Shard ${id} Reconnected!`, true);
    server.hook.send('', {
        'username': 'Server Screenshare',
        'embeds': [{
            'color': 16777215,
            'timestamp': new Date(),
            'fields': [{
                'name': `Shard ${id}`,
                'value': 'Shard Successfully Reconnected',
            }],
        }],
    })
}