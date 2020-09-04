const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ownermessage',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '[guildid] [ownerid]',
    args: true,
    guildOnly: false,
    category: 'Owner',
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        let server = client.guilds.cache.find(g => g.id === args[0])
        let owner = server.members.cache.find(m => m.id === args[1])
        const parts = message.content.split(" ");
        const request = parts.slice(3).join(" ");
        owner.send({
            embed: new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor("MESSAGE FROM BOT DEVELOPER!")
            .setDescription(`${request}\n If you have any questions, please add ItIsShadow#0001 and send them a message!`)
        })
        message.channel.send(`Message sent to ${owner.user.tag} in guild: ${server.name}`)
    }
}