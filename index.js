const Server = require('./src/server');
new Server({ messageCacheLifetime: 1, messageSweepInterval: 300 });