module.exports = (server) => {
    setInterval(function() {
        server.user.setActivity('sshelp');
    }, 1800000);
    server.info(`Logged in and Ready on ${server.readyAt}`, true);
}