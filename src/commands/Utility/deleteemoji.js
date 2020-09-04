const discord = require("discord.js");

module.exports = {
    name: 'deleteemoji',
    description: 'Deletes an emoji from your server!',
    args: true,
    usage: '[emoji]',
    guildOnly: true,
    cooldown: 0,
    aliases: ['deleteemote'],
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
            message.guild.emojis.cache.get(emojiid).delete().then(emoji => {
                message.channel.send({
                    embed: new discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`Emoji: ${emojiname} was successfully deleted!`)
                })
            })
        } catch(err) {
            console.log(err)
        }
    }
}