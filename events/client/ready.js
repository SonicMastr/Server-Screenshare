module.exports = (server) => {
    setInterval(function() {
        server.user.setActivity('sshelp');
        server.db.postStats(server.guilds.size, server.ws.shards.size);
    }, 1800000);
    server.info(`Logged in and Ready on ${server.readyAt}`, true);
}