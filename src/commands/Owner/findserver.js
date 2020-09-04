const discord = require("discord.js");

module.exports = {
    name: 'findserver',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '[code to run]',
    args: true,
    guildOnly: false,
    category: 'Owner',
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        var name = args.join(" ")
        var server = client.guilds.cache.find(g => g.id === name)
        message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${args[0]} is the guild: ${server.name} (${server.id}). The owner (${server.owner.user.tag})'s ID is: ${server.owner.id}`)
        })
    }
}