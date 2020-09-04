const discord = require("discord.js");

module.exports = {
    name: 'servername',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '[server id]',
    args: true,
    category: 'Owner',
    guildOnly: false,
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        const parts = message.content.split(" ");
        const request = parts.slice(1).join(" ");
        let server = client.guilds.cache.find(g => g.id === request)
        message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${request}'s guild name is ${server.name}\nTheir owner's ID is ${server.ownerID} (${server.owner.user.tag})`)
        })
    }
}