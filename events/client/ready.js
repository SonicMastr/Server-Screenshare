module.exports = (server) => {
    setInterval(function() {
        server.user.setActivity('sshelp');
	}, 120000);
    server.info(`Logged in and Ready on ${server.readyAt}`, true);
}