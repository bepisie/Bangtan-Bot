const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const bb = require('../../bangtanbucks')
const boost = require("../../../database/booster")

module.exports = {
    name: 'rob',
    aliases: ["steal"],
    description: 'Allows you to steal from other users.',
    args: true,
    usage: '[user]',
    guildOnly: true,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, PREFIX) => {
        money.getRob(message.member.id).then(time => {
            if ((Math.floor(Date.now() / 1000) - time) <= 1800) {
                let seconds = 1800 - (Math.floor(Date.now() / 1000) - time);
                let countdown;
                if (seconds < 60) {
                    countdown = (`${seconds} more second(s)`);
                } else if (60 < seconds && seconds < 3600) {
                    countdown = (`${Math.floor(seconds / 60)}m and ${Math.floor(seconds % 60)}s`);
                } else if (seconds > 3600) {
                    countdown = (`${Math.floor(seconds / 3600)}h, ${Math.floor((seconds % 3600) / 60)}m, and ${Math.floor((seconds % 3600) % 60)}s`);
                }
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Woah there!")
                    .setDescription(`You still have to wait ${countdown} before reusing ${PREFIX}rob.`)
                })
                return;   
            } else {
                if (!message.mentions.members.first()) return message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setDescription("You need to mention a user to rob!")
                })
        
                if (message.member.id === message.mentions.members.first().id) return message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setDescription("You can't rob yourself!")
                })
        
                if (message.mentions.members.first().id === '372653142912794626') return message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setDescription("You can't rob the owner!")
                })
                let user = message.mentions.members.first();
                money.getLast(user.id).then(time => {

                    boost.getBooster(user.id, 3).then(boost3 => {
                        boost.getBooster(user.id, 7).then(boost7 => {
                            boost.getBooster(user.id, 30).then(boost30 => {
                                if (boost3 !== 'none') {
                                    if ((259200 - (Math.floor(Date.now() / 1000) - boost3.rob3) < 0)) {
                                        boost.deleteBooster(user.id, 3)
                                    }
                                }
                                if (boost7 !== 'none') {
                                    if ((604800 - (Math.floor(Date.now() / 1000) - boost7.rob7) < 0)) {
                                        boost.deleteBooster(user.id, 7)
                                    }
                                }
                                if (boost30 !== 'none') {
                                    if ((2592000 - (Math.floor(Date.now() / 1000) - boost30.rob30) < 0)) {
                                        boost.deleteBooster(user.id, 30)
                                    }
                                }
                                boost.getBooster(user.id, 3).then(boost3 => {
                                    boost.getBooster(user.id, 7).then(boost7 => {
                                        boost.getBooster(user.id, 30).then(boost30 => {
                                            if (boost3 !== 'none') {
                                                return message.channel.send({
                                                    embed: new MessageEmbed()
                                                    .setColor("RED")
                                                    .setTitle("Buy")
                                                    .setDescription(`This person has a rob booster. You can't rob them.`)
                                                })
                                            }
                                            if (boost7 !== 'none') {
                                                return message.channel.send({
                                                    embed: new MessageEmbed()
                                                    .setColor("RED")
                                                    .setTitle("Buy")
                                                    .setDescription(`This person has a rob booster. You can't rob them.`)
                                                })
                                            }
                                            if (boost30 !== 'none') {
                                                return message.channel.send({
                                                    embed: new MessageEmbed()
                                                    .setColor("RED")
                                                    .setTitle("Buy")
                                                    .setDescription(`This person has a rob booster. You can't rob them.`)
                                                })
                                            }

                                            if (((Math.floor(Date.now() / 1000) - time) >= 84000) || isNaN(Math.floor(Date.now() / 1000) - time)) return message.channel.send({
                                                embed: new MessageEmbed()
                                                .setColor("RED")
                                                .setTitle("Woah there!")
                                                .setDescription("This person is in passive mode! You cannot rob them.")
                                            })
                                
                                            money.addRob(message.member.id, Math.floor(Date.now() / 1000))
                                            let percentrob = Math.ceil(Math.random() * 20)
                                            money.getCash(user.id).then(bal => {
                                                money.lastUse(message.member.id)
                                                let moneylose = Math.floor((parseInt(bal) / 100) * percentrob);
                                                money.removeCash(user.id, moneylose)
                                                money.addCash(message.member.id, moneylose)
                                                money.getCash(message.member.id).then(balance => {
                                                    message.channel.send({
                                                        embed: new MessageEmbed()
                                                        .setColor("GREEN")
                                                        .setTitle("Rob!")
                                                        .setDescription(`Wow! You took ${moneylose} ${bb.bb} from ${user}!\n\nYour new balance is ${(parseInt(balance) + moneylose)} ${bb.bb}!`)
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            }
        })
    }
}
