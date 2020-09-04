const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'snipe',
    description: 'Snipe what someone deleted!',
    args: false,
    usage: '<number>',
    guildOnly: true,
    cooldown: 0,
    aliases: ['messagesnipe'],
    accessibleBy: 'Everyone',
    category: 'Utility',
    run: async(client, message, args) => {
        const snipes = client.snipes.get(message.channel.id) || [];
        const msg = snipes[args[0]-1||0]
        if (!msg) return message.channel.send("There is no messages to be sniped!");
        const Embed = new MessageEmbed()
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription(msg.content)
            .setFooter(`Date: ${msg.date} | ${args[0]||1}/${snipes.length}`)
            if (msg.attachment) Embed.setImage(msg.attachment)
        message.channel.send(Embed)
    }
}