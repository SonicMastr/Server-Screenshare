module.exports = {
	config: {
		name: 'ev',
		description: 'executes a command',
		owner: true,
	},
	run: async (server, m, args) => {
		const clean = text => {
			if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
			else {return text;}
		};
		try {
			const code = args.join(' ');
			let evaled = eval(code);
			if (typeof evaled !== 'string') {evaled = require('util').inspect(evaled);}
			const embed = new server.embed.MessageEmbed();
		    embed.setAuthor('Server Screenshare Eval', server.user.avatarURL());
		    embed.setDescription('Eval');
			embed.setColor('ffb8b8');
			embed.addField('**EVAL**', '```js\n' + clean(evaled) + '```');
			m.channel.send(embed);
		}
		catch (err) {
			m.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	},
};