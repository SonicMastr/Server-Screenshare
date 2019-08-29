const Server = require('./src/server');
new Server({ messageCacheMaxSize: 1, messageCacheLifetime: 1, messageSweepInterval: 300, shardCount: 2, totalShardCount: 2, fetchAllMembers: false });