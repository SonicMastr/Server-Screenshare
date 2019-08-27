module.exports = {
	config: {
		name: 'help',
		description: 'Lists all of my commands or info about a specific command.',
		util: true,
		usage: '``help <command name>``'
	},
	run: async (server, m, args) => {
		const { commands } = server;
		if(args[0]) {
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.config.aliases && c.config.aliases.includes(name));
			if (!command) {
				return m.reply('that\'s not a valid command!');
			}

			const embed = new server.embed.MessageEmbed();

			embed.setAuthor(command.config.name, server.user.avatarURL());

			if (command.config.aliases) embed.addField('Aliases', command.config.aliases.join(', '), true);
			if (command.config.description) embed.setDescription('**Description:** ' + command.config.description);
			if (command.config.usage) embed.addField('Usage', command.config.usage, true);

			embed.setColor('0000FF'); // same green as above, just in hex

			m.author.send({ embed })
				.then(() => {
					if (m.channel.type === 'dm') return;
				})
				.catch(error => {
					console.error(`Could not send help DM to ${m.author.tag}.\n`, error);
					m.channel.send({
						'embed': {
							'description': '<@' + m.author.id + '>, looks like I can\'t DM you. Do you have DMs Disabled?',
							'color': 14226219, // Red Color
						},
					});
				});
		}
		if (!args.length) {
			const embed = new server.embed.MessageEmbed();

			embed.setAuthor('Server Screenshare Commands', server.user.avatarURL());
			embed.setDescription(`\nYou can send \`${server.prefix}help [command name]\` to get info on a specific command!`);
			embed.setColor('0000FF'); // same green as below, just in hex
			const newCmds = Array.from(commands);
			let com = [];
			let uti = [];
			let msc = [];
			for (let i = 0; i < newCmds.length; i++) {
				const thisCmd = newCmds[i][1];
				if (!thisCmd.config.disabled && !thisCmd.config.owner) {
					if (thisCmd.config.util) {
						uti.push('``' + thisCmd.config.name + '``');
					}
					else if (thisCmd.config.main) {
						com.push('``' + thisCmd.config.name + '``');
					}
					else {
						msc.push('``' + thisCmd.config.name + '``');
					}
				}
			}
			if (com.length) embed.addField('Main Commands', com.join(' '));
			if (uti.length) embed.addField('Utility Commands', uti.join(' '));
			if (msc.length) embed.addField('Miscellaneous Commands', msc.join(' '));
			return m.author.send({ embed })
				.then(() => {
					if (m.channel.type === 'dm') return;
				})
				.catch(error => {
					console.error(`Could not send help DM to ${m.author.tag}.\n`, error);
					m.channel.send({
						'embed': {
							'description': '<@' + m.author.id + '>, looks like I can\'t DM you. Do you have DMs Disabled?',
							'color': 14226219, // Red Color
						},
					});
				});
		}
	}
}