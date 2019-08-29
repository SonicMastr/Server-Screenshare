const time = require('../../src/TimeUtil');
const calc = require('../../src/Calculations');
module.exports = {
    config: {
        name: 'stats',
        description: 'Returns the Stats of the Bot',
        util: true,
    },
    run: async (server, m) => {
        const embed = new server.embed.MessageEmbed();
        let seconds = Math.floor(server.os.processUptime());
        let total = Math.ceil(server.os.totalmem() * 100) / 100;
        let used = process.memoryUsage().rss
        embed.setAuthor('Server Screenshare Stats');
        embed.setThumbnail(server.user.avatarURL());
		embed.setDescription('Results');
		embed.setColor('3099F0');
        embed.addField('**Uptime**', time.formatSec(seconds), true);
        embed.addField('**Resource Usage**', `Memory Used: ${calc.convertBytes(used)}\nTotal Memory: ${calc.convertMBytes(total)}`, true);
        embed.addField('**Shard Pings**', ping(server), true);
        embed.addField('**Discord Stats**', `${server.guilds.size} Guilds\n${server.users.size} Users\n${server.ws.shards.size} Shards`, true);
		return m.channel.send({ embed });
    }
};
function ping(server) {
    let pings = [];
	for (let i = 0; i < server.ws.shards.size; i++) {
		let ping = server.ws.shards.get(i).ping;
		pings.push(`Shard ${i}: ${Math.floor(ping)}ms`);
	}
	return pings;
};