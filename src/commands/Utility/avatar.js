const discord = require("discord.js");

module.exports = {
    name: 'avatar',
    description: 'Show your avatar or someone elses!',
    args: false,
    usage: '<user>',
    guildOnly: false,
    cooldown: 0,
    aliases: ['icon', 'pfp', 'profilepicture'],
    accessibleBy: 'Everyone',
    category: 'Utility',
    run: async(client, message, args) => {
        var embed = new discord.MessageEmbed()
            if(message.mentions.members.first()) {
                embed.setImage(`${message.mentions.members.first().user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})}`)
            } else {
                embed.setImage(`${message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})}`)
            }
        message.channel.send(embed)
    }
}