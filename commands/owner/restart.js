const util = require('util');
const exec = util.promisify(require('child_process').exec);
module.exports = {
    config: {
        name: 'restart',
		description: 'restarts the bot',
		aliases: ['r', 're'],
	    owner: true,
    },
	run: async (server, m, args) => {
		const msg = await m.channel.send('Restarting...');
		await exec('pm2 restart Screenshare');
	},
};