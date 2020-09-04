const discord = require("discord.js");

module.exports = {
    name: 'servercount',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '',
    args: false,
    category: 'Owner',
    guildOnly: false,
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`Bangtan Bot is in ${client.guilds.cache.size} servers!`)
        })
    }
}