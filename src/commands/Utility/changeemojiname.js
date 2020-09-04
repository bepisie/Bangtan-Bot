const discord = require("discord.js");

module.exports = {
    name: 'changeemojiname',
    description: 'Adds an emoji to your server!',
    args: true,
    usage: '[emoji] <new name>',
    guildOnly: true,
    cooldown: 0,
    aliases: ['editemoji', 'editemotename', 'changeemoji'],
    accessibleBy: 'Moderators',
    permRequirement: 'MANAGE_EMOJIS',
    category: 'Utility',
    run: async(client, message, args) => {
        if (args[0].startsWith('<a')) {
            var emojistrings = args[0].substring(3).slice(0, -1).replace(":", " ").split(" ");
            var emojiname = emojistrings[0]
            var emojiid = emojistrings[1]
        } else {
            var emojistrings = args[0].substring(2).slice(0, -1).replace(":", " ").split(" ");
            var emojiname = emojistrings[0]
            var emojiid = emojistrings[1]
        }

        try {
            var newemojiname = args[1]
            message.guild.emojis.cache.get(emojiid).edit({name: newemojiname})
            message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Emoji: ${message.guild.emojis.cache.get(emojiid)}'s name was successfully changed! The new name is '${newemojiname}'`)
            })
        } catch(err) {
            console.log(err)
        }
    }
}