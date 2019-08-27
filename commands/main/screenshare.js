module.exports = {
    config: {
        name: 'share',
        description: 'Creates an Embed with a Link to Allow Server Screenshare in the Voice Channel You are Currently in',
        aliases: ['screenshare', 'sr'],
        main: true,
    },
    run: async (server, m, args) => {
        const voice = m.member.voice.channel;
        if(!voice) return m.reply('You are not in a Voice Channel');
        const guild = voice.guild.id;
        const chanName = voice.name;
        const guildIcon = voice.guild.icon;
        const voiceID = voice.id;
        const embed = new server.embed.MessageEmbed();
        embed.setAuthor(`Screenshare Link For Channel: ${chanName} `, m.author.avatarURL());
        embed.setDescription(`[Screenshare](https://discordapp.com/channels/${guild}/${voiceID})`);
        embed.setThumbnail(`https://cdn.discordapp.com/icons/${guild}/${guildIcon}.webp`);
        embed.setFooter(voice.guild.name);
        embed.setColor('39e6d4');
        m.channel.send({ embed });
    },
};