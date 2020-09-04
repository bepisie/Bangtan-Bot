const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resetstatus',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '',
    args: false,
    guildOnly: false,
    category: 'Owner',
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        let servers = client.guilds.cache;
        i = servers.reduce((acc, guild) => acc + guild.memberCount, 0)
        client.user.setActivity(`${i} members in ${client.guilds.cache.size} servers!`, { type: 'WATCHING' })
        
        message.channel.send({
            embed: new MessageEmbed()
            .setColor("BLUE")
            .setDescription("Status has been sucessfully reset!")
        })
    }
}