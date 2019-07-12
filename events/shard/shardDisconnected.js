module.exports = (server, reason, id) => {
    server.error(`Shard ${id} Disconnected: ${reason.code}`);
    server.setImmediate(() => {
        server
.ws.shards.get(id)
            .connect()
            .then(() => {
                server
        .info(`Shard ${id} Reconnected after Disconnection`, true);
            })
            .catch((error) => server
    .error(`Shard ${id} Failed to Reconnect`));
    });
};