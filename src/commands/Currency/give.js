const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const ms = require("ms")
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'give',
    description: 'Give someone money!',
    args: true,
    usage: '[user] [amount]',
    guildOnly: true,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, anChan, PREFIX) => {
        if (!message.mentions.members.first()) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You need to mention a user to give money to!")
        })

        if (message.member.id === message.mentions.members.first().id) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You can't give yourself money!")
        })

        if (args[1] === `<@!${message.mentions.members.first().id}>`) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("The format is ?give [person] [amount]")
        })

        if (!args[1] || parseInt(args[1]) === NaN) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You need to put an amount to give!")
        })

        if (parseInt(args[1]) < 0) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You can't give someone negative money!")
        })

        if (parseInt(args[1]) === 0) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You can't give someone nothing!")
        })
        
        var user = message.mentions.members.first();
        money.lastUse(message.member.id)
        money.lastUse(user.id)
        money.getCash(message.member.id).then(async balance => {
            if (balance < args[1]) return message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`You can't afford to do this! You only have ${(parseInt(balance))} ${bb.bb}!`)
            
            })

            money.removeCash(message.member.id, args[1])
            money.addCash(user.id, args[1])
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Transfer!")
                .setDescription(`You have successfully given <@${user.id}> ${(parseInt(args[1]))} ${bb.bb}!`)
            })
        })
    }
}
