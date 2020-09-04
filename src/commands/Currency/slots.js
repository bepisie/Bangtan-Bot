const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const ms = require("ms")
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'slots',
    description: 'Play slots for money!',
    args: true,
    usage: '[amount]',
    guildOnly: false,
    cooldown: 1,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, anChan, PREFIX) => {
        money.lastUse(message.member.id)
        if (!args[0] || parseInt(args[0] === NaN)) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You need to put an amount to bet!")
        })
        var user = message.mentions.members.first();
        money.getCash(message.member.id).then(async balance => {
            if (balance < args[0]) return message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`You can't afford to do this! You only have ${(parseInt(balance))} ${bb.bb}!`)
            
            })

            if (parseInt(args[0]) < 10) return message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`You have to bet a minimum of 10 ${bb.bb}.`)
            })

            money.removeCash(message.member.id, args[0])
            var rows = [':100:', '<:hypesquad_events:585765895939424258>', '💰',':large_blue_diamond:', ':dollar:', ':money_with_wings:', ':briefcase:', ':poop:']
            var selection1 = Math.floor(Math.random() * 8)
            var selection2 = Math.floor(Math.random() * 8)
            var selection3 = Math.floor(Math.random() * 8)
            var selection4 = Math.floor(Math.random() * 8)
            var selection5 = Math.floor(Math.random() * 8)
            var selection6 = Math.floor(Math.random() * 8)
            var selection7 = Math.floor(Math.random() * 8)
            var selection8 = Math.floor(Math.random() * 8)
            var selection9 = Math.floor(Math.random() * 8)

            var message2 = await message.channel.send({
                embed: new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Slots!")
                .setDescription(`**>** ${rows[selection1]} ${rows[selection2]} ${rows[selection3]} **<**`)
            })

            setTimeout(function () {
                message2.edit({
                    embed: new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Slots!")
                    .setDescription(`**>** ${rows[selection4]} ${rows[selection5]} ${rows[selection6]} **<**`)
                })

                if (selection7 != selection8 && selection8 != selection9 && selection9 != selection7) {
                    message2.edit({
                        embed: new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Slots!")
                        .setDescription(`You lost ${args[0]} ${bb.bb}!\n\nYour new balance is ${parseInt(balance) - args[0]}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                    })
                } else if (selection7 === selection8 && selection8 != selection9 && selection9 != selection7) {
                    if (selection7 === 1) {
                        var payout = Math.ceil(parseInt(args[0]) * 2)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 2) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.3)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 3) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.6)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 4) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.7)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 5) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.4)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 6) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.5)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 7) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.2)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 8) {
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You broke even!\n\nYour new balance is ${balance}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                    }
                } else if (selection7 === selection9 && selection8 != selection9 && selection8 != selection7) {
                    if (selection7 === 1) {
                        var payout = Math.ceil(parseInt(args[0]) * 2.5)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 2) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.4)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 3) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.8)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 4) {
                        var payout = Math.ceil(parseInt(args[0]) * 2)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 5) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.55)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 6) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.65)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 7) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.25)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 8) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.1)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    }
                } else if (selection9 === selection8 && selection8 != selection7 && selection9 != selection7) {
                    if (selection9 === 1) {
                        var payout = Math.ceil(parseInt(args[0]) * 2)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection9 === 2) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.3)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection9 === 3) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.6)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection9 === 4) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.7)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection9 === 5) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.4)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection9 === 6) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.5)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection9 === 7) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.2)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection9 === 8) {
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You broke even!\n\nYour new balance is ${balance}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                    }
                } else if (selection7 === selection9 && selection8 === selection7) {
                    if (selection7 === 1) {
                        var payout = Math.ceil(parseInt(args[0]) * 10)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`**JACKPOT!**\n\nYou won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 2) {
                        var payout = Math.ceil(parseInt(args[0]) * 2.4)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 3) {
                        var payout = Math.ceil(parseInt(args[0]) * 3)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 4) {
                        var payout = Math.ceil(parseInt(args[0]) * 5)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 5) {
                        var payout = Math.ceil(parseInt(args[0]) * 3.5)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 6) {
                        var payout = Math.ceil(parseInt(args[0]) * 2.7)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 7) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.9)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    } else if (selection7 === 8) {
                        var payout = Math.ceil(parseInt(args[0]) * 1.5)
                        message2.edit({
                            embed: new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle("Slots!")
                            .setDescription(`You won ${payout} ${bb.bb}!\n\nYour new balance is ${(payout + parseInt(balance) - parseInt(args[0]))} ${bb.bb}\n\n**>** ${rows[selection7]} ${rows[selection8]} ${rows[selection9]} **<**`)
                        })
                        money.addCash(message.member.id, payout)
                    }
                }
            }, 500) 
        }) 
    }
}
