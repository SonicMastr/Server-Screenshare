const util = require('util');
module.exports = {
    config: {
        name: 'res',
		description: 'restarts the bot',
	    owner: true,
    },
	run: async (server, m, args) => {
		const msg = await m.channel.send('Restarting...');
		await server.destroy();
		server._login();
		msg.edit(`Up and running again`);
	},
};