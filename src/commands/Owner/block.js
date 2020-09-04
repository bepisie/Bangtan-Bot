const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'block',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '[member/user ID]',
    args: false,
    guildOnly: false,
    category: 'Owner',
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        message.channel.send({
            embed: new MessageEmbed()
            .setImage("https://media.giphy.com/media/Tgyf2Pb8CekYXCFZMo/giphy.gif")
        })
    }
}