const discord = require("discord.js")

module.exports = {
    name: 'f',
    description: 'Pay your respects!',
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 5,
    accessibleBy: 'Everyone',
    category: 'Fun',
    run: async(client, message, args) => {
        message.channel.send(`${message.member.nickname ? message.member.nickname : message.author.username} has paid their respects. :pensive:`)
    }
}