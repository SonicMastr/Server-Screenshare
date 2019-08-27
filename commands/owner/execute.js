const util = require('util');
const exec = util.promisify(require('child_process').exec);
module.exports = {
	config: {
		name: 'ex',
		description: 'executes a command',
		owner: true,
	},
	run: async (server, m, args) => {
		const clean = text => {
			if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
			else {return text;}
		};
		try {
			const code = await args.join(' ');
			const { stdout, stderr } = await exec(code);
			m.channel.send('```js\n' + clean(stdout) + '\n```');
		}
		catch (err) {
			m.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
		}
	},
};