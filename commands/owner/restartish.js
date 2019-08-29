const { token } = require('../config.json');
module.exports = {
    config: {
        name: 'res',
		description: 'restarts the bot',
	    owner: true,
    },
	run: async (server, m, args) => {
		const msg = await m.channel.send('Restarting...');
		await server.destroy();
		server.login(token);
		msg.edit(`Up and running again`);
	},
};