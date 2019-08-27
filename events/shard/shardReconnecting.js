let lastTime = 0;
module.exports = (server, id) => {
    server.warning(`Shard ${id} Lost Connection. Reconnecting...`);
    if(Date.now() - lastTime > 60000) {
        server.hook.send('', {
            'username': 'Server Screenshare',
            'embeds': [{
                'color': 16777215,
                'timestamp': new Date(),
                'fields': [{
                    'name': `Shard ${id}`,
                    'value': 'Lost Connection. Reconnecting...',
                }],
            }],
        })
        lastTime = Date.now();
    };
    
}