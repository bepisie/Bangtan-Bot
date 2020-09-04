const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'findchannel',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '',
    args: true,
    guildOnly: false,
    category: 'Owner',
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        let channelid = args[0]
        client.guilds.cache.forEach(guild => {
            if (guild.channels.cache.find(g => g.id === channelid)) {
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("BLUE")
                    .setDescription(`The channel: ${channelid} belongs to ${guild.id} (${guild.name})`)
                })
            }
        })
    }
}