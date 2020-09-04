const Discord = require("discord.js")

module.exports = {
    name: 'magik',
    description: 'Magiks your avatar or someone elses! (Note: Not all avatars work with this API)',
    args: false,
    usage: '<member>',
    guildOnly: false,
    cooldown: 5,
    accessibleBy: 'Everyone',
    category: 'Image',
    run: async(client, message, args) => {
        let image;
        if (message.attachments.first()) {
            let attachment = message.attachments.first().url;
            image = `https://api.alexflipnote.dev/filter/magik?image=${attachment}`
            const embed = new Discord.MessageEmbed()
            embed.setImage(image)
            embed.setTimestamp()
            embed.setFooter('Magiked');
            message.channel.send(embed);
            return;
        }
        if(!args[0]) {
            image = `https://api.alexflipnote.dev/filter/magik?image=${message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 })}`
        } else {
            if (!message.mentions.members.first()) return message.channel.send({
                embed: new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription("You need to mention a user, or only use the command!")
            })
            image = `https://api.alexflipnote.dev/filter/magik?image=${message.mentions.users.first().avatarURL({ format: 'png', dynamic: true, size: 2048 })}`
        }
        const embed = new Discord.MessageEmbed()
            embed.setImage(image)
            embed.setTimestamp()
            embed.setFooter('Magiked');
        message.channel.send(embed);
    }
}