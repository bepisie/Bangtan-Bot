const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const ms = require("ms")
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'coinflip',
    description: 'Flip a coin (against AI or another user) to multiply your money!',
    args: true,
    usage: '<user> [amount]',
    guildOnly: true,
    cooldown: 0,
    aliases: ['cf'],
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, anChan, PREFIX) => {
        if (message.mentions.members.first()) {
            if (message.member.id === message.mentions.members.first().id) return message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription("You can't go against yourself!")
            })

            if (!args[1] || parseInt(args[1] === NaN)) return message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription("You need to put a bet on!")
            })

            if (args[1] === `<@!${message.mentions.members.first().id}>`) return message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription("The format is ?fight [person] [amount]")
            })
        } else {
            if (!args[0] || parseInt(args[0] === NaN)) return message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription("You need to put a bet on!")
            })
        }
        
        var user = message.mentions.members.first();
        var user1 = message.member;
        money.lastUse(message.member.id)
        if (user) {
            money.lastUse(user.id)
        }
        money.getCash(message.member.id).then(async balance => {
            if (user) {
                if (parseInt(balance) < parseInt(args[1])) return message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`You can't afford to do this! You only have ${(parseInt(balance))} ${bb.bb}!`)
                })
            } else {
                if (parseInt(balance) < parseInt(args[0])) return message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`You can't afford to do this! You only have ${(parseInt(balance))} ${bb.bb}!`)
                })
            }

            if (user) {
                if (parseInt(args[1]) < 10) return message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`You have to bet a minimum of 10 ${bb.bb}.`)
                })
            } else {
                if (parseInt(args[0]) < 10) return message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`You have to bet a minimum of 10 ${bb.bb}.`)
                })
            }
            
            if (user) {
                money.getCash(user.id).then(async balance => {
                    if (balance < args[1]) return message.channel.send({
                        embed: new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`The person you want to coinflip against can't afford to, they only have ${balance} ${bb.bb}!`)
                    })
                    var messagefight = await message.channel.send({
                        embed: new MessageEmbed()
                        .setTitle("Coinflip!")
                        .setColor("RANDOM")
                        .setDescription(`<@${user.id}>, <@${message.member.id}> wants to coinflip against you for ${(parseInt(args[1]))}. Do you accept?`)
                    })
            
                    await messagefight.react('✅')
                    await messagefight.react('❌')
            
                    let reactionFilter = (reaction, user2) => (user2.id === user.id) && !user.bot;
                    let reaction = (await messagefight.awaitReactions(reactionFilter, { max: 1 })).first();
            
                    if (reaction.emoji.name === '✅') {
                        money.removeCash(message.member.id, args[1])
                        money.removeCash(user.id, args[1])
                        let coinselect1;
                        let coinselect2;

                        var messagecoin = await message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("BLUE")
                            .setTitle("Coinflip!")
                            .setDescription(`${user1}, please react with heads or tails to pick your coin.`)
                        })

                        await messagecoin.react('726106647986176071')
                        await messagecoin.react('640590704460038154')

                        let reactionFilter2 = (reaction, user) => (user1.id === user.id) && !user.bot;
                        let reaction2 = (await messagecoin.awaitReactions(reactionFilter2, { max: 1 })).first();

                        if (reaction2.emoji.id === '726106647986176071') {
                            coinselect1 = '<:uwu:726106647986176071>'
                            coinselect2 = '<:suga:640590704460038154>'
                        } else {
                            coinselect2 = '<:uwu:726106647986176071>'
                            coinselect1 = '<:suga:640590704460038154>'
                        }

                        var winner = Math.ceil(Math.random() * 100);
                        var winner2 = winner>50 ? user : message.member;
                        var message2 = await message.channel.send({
                            embed: new MessageEmbed()
                            .setTitle("Coinflip!")
                            .setColor("RANDOM")
                            .setDescription("It's flipping!")
                        })
                        setTimeout(function() {
                            if (winner2 === user) {
                                message2.edit({
                                    embed: new MessageEmbed()
                                    .setTitle("Coinflip!")
                                    .setColor("RANDOM")
                                    .setDescription(`${coinselect2}\n\nThe winner is ${winner2}! You won ${(parseInt(args[1]) * 2)} ${bb.bb}.`)
                                })
                            } else {
                                message2.edit({
                                    embed: new MessageEmbed()
                                    .setTitle("Coinflip!")
                                    .setColor("RANDOM")
                                    .setDescription(`${coinselect1}\n\nThe winner is ${winner2}! You won ${(parseInt(args[1]) * 2)} ${bb.bb}.`)
                                })
                            }
                
                            money.addCash(winner2.id, parseInt(args[1]) * 2)
                        }, 3000)
                    }
                })
            } else {
                money.removeCash(user1.id, args[0])
                let coinselect;
                let coinselect2;
                var messagecoin = await message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("Coinflip!")
                    .setDescription(`${user1}, please react with heads or tails to pick your coin.`)
                })

                await messagecoin.react('726106647986176071')
                await messagecoin.react('640590704460038154')

                let reactionFilter2 = (reaction, user) => (user1.id === user.id) && !user.bot;
                let reaction2 = (await messagecoin.awaitReactions(reactionFilter2, { max: 1 })).first();

                if (reaction2.emoji.id === '726106647986176071') {
                    coinselect = '<:uwu:726106647986176071>'
                    coinselect2 = '<:suga:640590704460038154>'
                } else {
                    coinselect = '<:suga:640590704460038154>'
                    coinselect2 = '<:uwu:726106647986176071>'
                }
                var winner = Math.ceil(Math.random() * 100);
                var winner2 = winner>50 ? user1 : '';
                var message2 = await message.channel.send({
                    embed: new MessageEmbed()
                    .setTitle("Coinflip!")
                    .setColor("RANDOM")
                    .setDescription("It's flipping!")
                })
                setTimeout(function() {
                    if (winner2 === '') {
                        message2.edit({
                            embed: new MessageEmbed()
                            .setTitle("Coinflip!")
                            .setColor("RANDOM")
                            .setDescription(`${coinselect2}\n\n${message.member}, you lose! Your new balance is ${(parseInt(balance) - args[0])}.`)
                        })
                    } else {
                        message2.edit({
                            embed: new MessageEmbed()
                            .setTitle("Coinflip!")
                            .setColor("RANDOM")
                            .setDescription(`${coinselect}\n\n${message.member}, you win! You won ${(parseInt(args[0]) * 2)} ${bb.bb}.\nYour new balance is: ${(parseInt(balance) + parseInt(args[0]))} ${bb.bb}`)
                        })
                        money.addCash(user1.id, args[0] * 2)
                    }
                }, 3000)
            }
        })   
    }
}
