const Discord = require("discord.js")

module.exports = {
    name: 'salty',
    description: 'Make yourself or someone else salty!',
    args: false,
    usage: '<member>',
    guildOnly: false,
    cooldown: 5,
    aliases: ['salt'],
    accessibleBy: 'Everyone',
    category: 'Image',
    run: async(client, message, args) => {
        const embed = new Discord.MessageEmbed()
        if(!args[0]) {
            embed.setImage(`https://api.alexflipnote.dev/salty?image=${message.author.displayAvatarURL({ dynamic: true, size: 1024})}`)
        } else {
            if (!message.mentions.members.first()) return message.channel.send({
                embed: new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription("You need to mention a user, or only use the command!")
            })
            embed.setImage(`https://api.alexflipnote.dev/salty?image=${message.mentions.members.first().user.displayAvatarURL({ dynamic: true, size: 1024})}`)
        }
        message.channel.send(embed);
    }
}