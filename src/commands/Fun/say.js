const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'say',
    description: 'Makes Bangtan Bot say something!',
    args: true,
    usage: '[speech]',
    guildOnly: false,
    cooldown: 5,
    accessibleBy: 'Everyone',
    category: 'Fun',
    run: async(client, message, args) => {

        var parts = message.content.split(" ");
        var speech = parts.slice(1).join(" ");
        if (message.channel.type !== 'dm') {
            if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                message.delete();
            }
        }
        
        if (!speech) return message.channel.send("You need to tell me to say something!");
        if (!message.member.hasPermission("MENTION_EVERYONE")) {
            message.channel.send({ disableMentions: 'everyone', content: speech });
        } else {
            message.channel.send(speech);
        }
        if (message.channel.type !== 'dm' && message.guild.id === '616757221253972057') return console.log(`${message.author.username} said: ${speech} at ${message.createdAt} in channel: ${message.channel.name} in server: ${message.guild.name}`);
    }
}