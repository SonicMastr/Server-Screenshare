module.exports = (server, err, id) => {
    server.error(`{Shard ${id}} ${err.toString()}`);
}