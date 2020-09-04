const discord = require("discord.js");

module.exports = {
    name: 'addemoji',
    description: 'Adds an emoji to your server!',
    args: true,
    usage: '[emoji] <emojiname>',
    guildOnly: true,
    cooldown: 0,
    aliases: ['addemote'],
    accessibleBy: 'Moderators',
    permRequirement: 'MANAGE_EMOJIS',
    category: 'Utility',
    run: async(client, message, args) => {

        if (message.attachments.first()) {
            var emojiurl = message.attachments.first().url;
            if (!args[0]) {
                message.channel.send({
                    embed: new discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription(`You need to specify a name for the emoji!`)
                })
            }
            var emojiname = args[0]

            try {
                message.guild.emojis.create(emojiurl, emojiname).then(emoji => {
                    message.channel.send({
                        embed: new discord.MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`Emoji: ${emoji} was successfully added! The name is '${emoji.name}'`)
                    })
                }).catch(err => {
                    message.channel.send("Something went wrong! Either the picture is too big or it's an invalid format!")
                })
            } catch(err) {
                
            }
        } else {
            if (args[0].startsWith('<a')) {
                var emojistrings = args[0].substring(3).slice(0, -1).replace(":", " ").split(" ");
                var emojiname = args[1] ? args[1] : emojistrings[0]
                var emojiid = emojistrings[1]
                var emoji = `https://cdn.discordapp.com/emojis/${emojiid}.gif?v=1`
            } else {
                var emojistrings = args[0].substring(2).slice(0, -1).replace(":", " ").split(" ");
                var emojiname = args[1] ? args[1] : emojistrings[0]
                var emojiid = emojistrings[1]
                var emoji = `https://cdn.discordapp.com/emojis/${emojiid}.png?v=1`
            }
    
            try {
                message.guild.emojis.create(emoji, emojiname).then(emoji => {
                    message.channel.send({
                        embed: new discord.MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`Emoji: ${emoji} was successfully added! The name is '${emoji.name}'`)
                    })
                })
            } catch(err) {
                console.log(err)
            }
        }
    }
}