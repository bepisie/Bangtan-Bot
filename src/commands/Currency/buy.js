const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const ms = require("ms")
const bb = require('../../bangtanbucks')
const game = require('../../../database/games')
const boost = require("../../../database/booster")
const booster = require("../../../database/booster")

module.exports = {
    name: 'buy',
    description: 'Buy stuff with your money!',
    args: true,
    usage: '[item id]',
    guildOnly: false,
    cooldown: 1,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, anChan, PREFIX) => {
        let gametobuy = args.join("_")

        if (gametobuy.toLowerCase() === 'hilo' || gametobuy.toLowerCase() === 'higher_or_lower') {
            game.getGame(message.member.id, 'hilo').then(bool => {
                if (bool !== 'false') {
                    return message.channel.send({
                        embed: new MessageEmbed()
                        .setColor("RED")
                        .setTitle("Buy")
                        .setDescription(`You already own ${gametobuy}. You can't buy it again!`)
                    }) 
                }
            })
            money.getCash(message.member.id).then(bal => {
                if (parseInt(bal) < 50000) {
                    return message.channel.send({
                        embed: new MessageEmbed()
                        .setColor("RED")
                        .setTitle("Buy")
                        .setDescription(`You don't have enough ${bb.bb} to buy ${gametobuy}! You only have ${bal} ${bb.bb}`)
                    })
                } else {
                    game.buyGame(message.member.id, 'hilo')
                    money.removeCash(message.member.id, 50000)
                    message.channel.send({
                        embed: new MessageEmbed()
                        .setColor("GREEN")
                        .setTitle("Buy")
                        .setDescription(`You have successfully bought ${gametobuy} for 50k ${bb.bb}.\n\nYour new balance is: ${parseInt(bal) - 50000} ${bb.bb}.`)
                    })
                }
            })
        } else if (gametobuy.toLowerCase() === '3dayrob' || gametobuy.toLowerCase() === '3 day rob') {
            boost.getBooster(message.member.id, 3).then(boost3 => {
                boost.getBooster(message.member.id, 7).then(boost7 => {
                    boost.getBooster(message.member.id, 30).then(boost30 => {
                        if (boost3 !== 'none' || boost7 !== 'none' || boost30 !== 'none') {
                            return message.channel.send({
                                embed: new MessageEmbed()
                                .setColor("RED")
                                .setTitle("Buy")
                                .setDescription(`You already have a rob booster. You can't rebuy it until your current booster runs out!`)
                            })
                        }
                        money.getCash(message.member.id).then(bal => {
                            if (parseInt(bal) < 50000) {
                                return message.channel.send({
                                    embed: new MessageEmbed()
                                    .setColor("RED")
                                    .setTitle("Buy")
                                    .setDescription(`You don't have enough ${bb.bb} to buy ${gametobuy}! You only have ${bal} ${bb.bb}`)
                                })
                            } else {
                                boost.buyBooster(message.member.id, 3)
                                money.removeCash(message.member.id, 50000)
                                message.channel.send({
                                    embed: new MessageEmbed()
                                    .setColor("GREEN")
                                    .setTitle("Buy")
                                    .setDescription(`You have successfully bought ${gametobuy} for 50k ${bb.bb}.\n\nYour new balance is: ${parseInt(bal) - 50000} ${bb.bb}.`)
                                })
                            }
                        })
                    })
                })
            })
        } else if (gametobuy.toLowerCase() === '7dayrob' || gametobuy.toLowerCase() === '7 day rob') {
            boost.getBooster(message.member.id, 3).then(boost3 => {
                boost.getBooster(message.member.id, 7).then(boost7 => {
                    boost.getBooster(message.member.id, 30).then(boost30 => {
                        if (boost3 !== 'none' || boost7 !== 'none' || boost30 !== 'none') {
                            return message.channel.send({
                                embed: new MessageEmbed()
                                .setColor("RED")
                                .setTitle("Buy")
                                .setDescription(`You already have a rob booster. You can't rebuy it until your current booster runs out!`)
                            })
                        }
                        money.getCash(message.member.id).then(bal => {
                            if (parseInt(bal) < 100000) {
                                return message.channel.send({
                                    embed: new MessageEmbed()
                                    .setColor("RED")
                                    .setTitle("Buy")
                                    .setDescription(`You don't have enough ${bb.bb} to buy ${gametobuy}! You only have ${bal} ${bb.bb}`)
                                })
                            } else {
                                boost.buyBooster(message.member.id, 7)
                                money.removeCash(message.member.id, 100000)
                                message.channel.send({
                                    embed: new MessageEmbed()
                                    .setColor("GREEN")
                                    .setTitle("Buy")
                                    .setDescription(`You have successfully bought ${gametobuy} for 100k ${bb.bb}.\n\nYour new balance is: ${parseInt(bal) - 100000} ${bb.bb}.`)
                                })
                            }
                        })
                    })
                })
            })
        } else if (gametobuy.toLowerCase() === '30dayrob' || gametobuy.toLowerCase() === '30 day rob') {
            boost.getBooster(message.member.id, 3).then(boost3 => {
                boost.getBooster(message.member.id, 7).then(boost7 => {
                    boost.getBooster(message.member.id, 30).then(boost30 => {
                        if (boost3 !== 'none' || boost7 !== 'none' || boost30 !== 'none') {
                            return message.channel.send({
                                embed: new MessageEmbed()
                                .setColor("RED")
                                .setTitle("Buy")
                                .setDescription(`You already have a rob booster. You can't rebuy it until your current booster runs out!`)
                            })
                        }
                        money.getCash(message.member.id).then(bal => {
                            if (parseInt(bal) < 250000) {
                                return message.channel.send({
                                    embed: new MessageEmbed()
                                    .setColor("RED")
                                    .setTitle("Buy")
                                    .setDescription(`You don't have enough ${bb.bb} to buy ${gametobuy}! You only have ${bal} ${bb.bb}`)
                                })
                            } else {
                                boost.buyBooster(message.member.id, 30)
                                money.removeCash(message.member.id, 250000)
                                message.channel.send({
                                    embed: new MessageEmbed()
                                    .setColor("GREEN")
                                    .setTitle("Buy")
                                    .setDescription(`You have successfully bought ${gametobuy} for 250k ${bb.bb}.\n\nYour new balance is: ${parseInt(bal) - 250000} ${bb.bb}.`)
                                })
                            }
                        })
                    })
                })
            })
        }
    }
}