module.exports = {
    config: {
        name: 'ping',
        description: 'Returns Ping of the Bot',
        owner: true,
    },
    run: async (server, m) => {
        const embed = new server.embed.MessageEmbed();
		embed.setAuthor('Shard Pings', server.user.avatarURL());
		embed.setDescription('Results');
		embed.setColor('3099F0');
		for (let i = 0; i < server.ws.shards.size; i++) {
			let ping = server.ws.shards.get(i).ping;
			embed.addField(`Shard ${i}`, '```js\n' + Math.floor(ping) + 'ms```', true);
		}
		return m.channel.send({ embed });
    },
};