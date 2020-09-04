const discord = require("discord.js");
const money = require("../../../database/sql")
module.exports = {
    name: 'removemoney',
    description: '',
    category: '',
    accessibleBy: 'Owner',
    usage: '[code to run]',
    args: false,
    guildOnly: false,
    category: 'Owner',
    cooldown: 0,
    run: async(client, message, args, PREFIX, anChan, Utils, sqlite, keyv, connection, announcementChan, leaveChan, guildCommandPrefixes) => {
        money.removeCash(message.mentions.members.first() ? message.mentions.members.first().id : args[0], args[1])
        message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(`You removed £${args[1]} from ${message.mentions.members.first().user.username}`)
        })
    }
}