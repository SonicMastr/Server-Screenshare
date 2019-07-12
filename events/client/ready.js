module.exports = (server) => {
    server.user.setActivity('sshelp');
    server.info(`Logged in and Ready on ${server.readyAt}`, true);
}