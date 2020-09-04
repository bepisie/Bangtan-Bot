const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'balance',
    aliases: ["bal"],
    description: 'Allows you to check your balance.',
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, anChan, PREFIX) => {
        if (message.mentions.members.first()) {
            money.getCash(message.mentions.members.first().id).then(balance => {
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle(`${message.mentions.members.first().user.username}`)
                    .setDescription(`**Balance:** ${(balance.toString())} ${bb.bb}`)
                    .setTimestamp()
                });
            })
        } else {
            money.getCash(message.member.id).then(balance => {
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle(`${message.author.username}`)
                    .setDescription(`**Balance:** ${(balance.toString())} ${bb.bb}`)
                    .setTimestamp()
                });
            })
        }
    }
}
