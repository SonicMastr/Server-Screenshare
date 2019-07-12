﻿module.exports = async (server, m) => {
    if (m.author.bot) return;
    if (m.channel.type === 'dm' && !m.content.startsWith(`${server.prefix}help`)) return;
    let args = m.content.slice(server.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (!m.content.startsWith(server.prefix)) return;
    let commandfile = server.commands.get(cmd) || server.commands.get(server.aliases.get(cmd));
    if (commandfile) {
        if (commandfile.config.owner) {
            if (m.author.id !== `${server.ownerID}`) return m.reply('You can\'t do that!').then(msg => { msg.delete(5000); });
        }
        commandfile.run(server, m, args);
    }
}