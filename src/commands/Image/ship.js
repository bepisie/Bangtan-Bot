const Discord = require("discord.js")

module.exports = {
    name: 'ship',
    description: 'Ship yourself with someone else, or ship 2 others together!',
    args: true,
    usage: '[member 1] <member 2>',
    guildOnly: false,
    cooldown: 5,
    accessibleBy: 'Everyone',
    category: 'Image',
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send("There needs to be 2 people for a ship")
        const embed = new Discord.MessageEmbed()
        if(args[1]) {
            embed.setImage(`https://api.alexflipnote.dev/ship?user=${message.mentions.members.first().user.displayAvatarURL({ dynamic: true, size: 1024})}&user2=${message.mentions.members.last().user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})}`)
        } else {
            if (!message.mentions.members.first()) return message.channel.send({
                embed: new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription("You need to mention a user, or only use the command!")
            })
            embed.setImage(`https://api.alexflipnote.dev/ship?user=${message.author.displayAvatarURL({ dynamic: true, size: 1024})}&user2=${message.mentions.members.first().user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})}`)
        }
        message.channel.send(embed);
    }
}