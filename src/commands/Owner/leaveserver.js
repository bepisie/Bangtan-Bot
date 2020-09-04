const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leaveserver',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '<channelid>',
    args: true,
    guildOnly: false,
    category: 'Owner',
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        let channelid = args[0]
        let guild = client.guilds.cache.find(g => g.id === channelid)
        guild.leave()
        message.channel.send({
            embed: new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`Successfully left guild: ${args[0]} (${guild.name})`)
        })
    }
}