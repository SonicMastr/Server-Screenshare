module.exports = {
	config: {
		name: 'rc',
		description: 'Reloads Commands',
		owner: true,
	},
	run: async (server, m, args) => {
		let promise = server.loadCMDs();
		m.channel.send(promise);
	},
};