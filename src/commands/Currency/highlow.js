const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const ms = require("ms")
const bb = require('../../bangtanbucks')
const game = require("../../../database/games")

module.exports = {
    name: 'highlow',
    description: `Play higher or lower for money! [Store bought game]\nThis game costs 5000 ${bb.bb} to play.`,
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 1,
    aliases: ['higherorlower', 'hilo'],
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, anChan, PREFIX) => {
        game.getGame(message.member.id, 'hilo').then(bool => {
            if (bool === 'false') {
                return message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Higher or lower")
                    .setDescription(`You do not own this game! You can buy it using '${anChan}buy hilo'`)
                })
            }
            money.lastUse(message.member.id)
        var user = message.member;
        money.getCash(message.member.id).then(async balance => {
            if (balance < 5000) return message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`You can't afford to do this! You only have ${(parseInt(balance))} ${bb.bb}!`)
            
            })
            money.removeCash(user.id, 5000)

            let number = Math.floor(Math.random() * 21);
            let i = 0;
            let turnno = 1;
            let safetyround;
            let amounts = [100, 250, 500, 1000, 2500, 5000, 7500, 10000, 12500, 15000, 20000, 25000, 30000, 40000, 50000, 60000, 75000, 90000, 100000, 125000, 175000, 225000, 300000, 375000, 500000]

            await message.channel.send({
                embed: new MessageEmbed()
                .setColor("BLUE")
                .setTitle("Higher Or Lower")
                .setDescription("A number will be put in chat, and you have to guess whether the next number will be higher or lower!\nUse '⬆️' to select higher and '️️⬇️' to select lower.\nYou can cash out by pressing '⏹️'.")
            })

            while (i === 0) {
                let mesg;

                if (turnno === 26) {
                    money.addCash(message.member.id, amounts[turnno - 1])
                    money.getCash(message.member.id).then(bal => {
                        return message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("GREEN")
                            .setTitle("JACKPOT!")
                            .setDescription(`Congratulations! You won the jackpot of 500k ${bb.bb}.\n\nYour new balance is: ${parseInt(bal) + amounts[turnno - 1]}.`)
                        })
                    })
                }

                if (turnno === 1) {
                    mesg = await message.channel.send({
                        embed: new MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`Thanks for playing! 5000 ${bb.bb} have been deducted from your account.\n\nFirst number: ${number}`)
                    })
                } else if (turnno < 5) {
                    mesg = await message.channel.send({
                        embed: new MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`Congrats!\nYou are on turn ${turnno}.\n\nNumber: ${number}\n\nCash out amount: ${amounts[turnno - 1]} ${bb.bb}`)
                    })
                } else {
                    mesg = await message.channel.send({
                        embed: new MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`Congrats!\nYou are on turn ${turnno}.\n\nNumber: ${number}\n\nCash out amount: ${amounts[turnno - 1]} ${bb.bb}\n\nCheckpoint: ${safetyround}`)
                    })
                }

                mesg.react('⬆️')
                mesg.react('⬇️')
                mesg.react('⏹️')

                let reactionFilter = (reaction, user) => (user.id === message.author.id) && !user.bot;
                let reaction = (await mesg.awaitReactions(reactionFilter, { max: 1 })).first();

                let number1 = Math.floor(Math.random() * 21)
                while (number1 === number) {
                    number1 = Math.floor(Math.random() * 21)
                }

                if (reaction.emoji.name === '⬆️' && number <= number1) {
                    number = number1;
                    turnno = turnno + 1;
                    if (turnno === 5) safetyround = 5;
                    if (turnno === 10) safetyround = 10;
                    if (turnno === 15) safetyround = 15;
                    if (turnno === 20) safetyround = 20;
                } else if (reaction.emoji.name === '⬆️' && number >= number1) {
                    if (safetyround === undefined) {
                        return message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("RED")
                            .setTitle("You lose")
                            .setDescription(`Unlucky! You lost on round ${turnno}.\n\nThe number was ${number1}\nBetter luck next time!`)
                        })
                    } else if (safetyround === 5) {
                        money.addCash(message.member.id, amounts[4])
                        money.getCash(message.member.id).then(bal => {
                            return message.channel.send({
                                embed: new MessageEmbed()
                                .setColor("RED")
                                .setTitle("You lose")
                                .setDescription(`Unlucky! You lost on round ${turnno}.\n\nThe number was ${number1}\nYou still got ${amounts[4]} ${bb.bb}!\nYour new balance is: ${parseInt(bal) + amounts[4]} ${bb.bb}.`)
                            })  
                        })
                    } else if (safetyround === 10) {
                        money.addCash(message.member.id, amounts[9])
                        money.getCash(message.member.id).then(bal => {
                            return message.channel.send({
                                embed: new MessageEmbed()
                                .setColor("RED")
                                .setTitle("You lose")
                                .setDescription(`Unlucky! You lost on round ${turnno}.\n\nThe number was ${number1}\nYou still got ${amounts[9]} ${bb.bb}!\nYour new balance is: ${parseInt(bal) + amounts[9]} ${bb.bb}.`)
                            })  
                        })
                    }  else if (safetyround === 15) {
                        money.addCash(message.member.id, amounts[14])
                        money.getCash(message.member.id).then(bal => {
                            return message.channel.send({
                                embed: new MessageEmbed()
                                .setColor("RED")
                                .setTitle("You lose")
                                .setDescription(`Unlucky! You lost on round ${turnno}.\n\nThe number was ${number1}\nYou still got ${amounts[14]} ${bb.bb}!\nYour new balance is: ${parseInt(bal) + amounts[14]} ${bb.bb}.`)
                            })  
                        })
                    }  else if (safetyround === 20) {
                        money.addCash(message.member.id, amounts[19])
                        money.getCash(message.member.id).then(bal => {
                            return message.channel.send({
                                embed: new MessageEmbed()
                                .setColor("RED")
                                .setTitle("You lose")
                                .setDescription(`Unlucky! You lost on round ${turnno}.\n\nThe number was ${number1}\nYou still got ${amounts[19]} ${bb.bb}!\nYour new balance is: ${parseInt(bal) + amounts[19]} ${bb.bb}.`)
                            })  
                        })
                    }   
                    i = 1;
                } else if (reaction.emoji.name === '⬇️' && number >= number1) {
                    number = number1;
                    turnno = turnno + 1;
                    if (turnno === 5) safetyround = 5;
                    if (turnno === 10) safetyround = 10;
                    if (turnno === 15) safetyround = 15;
                    if (turnno === 20) safetyround = 20;
                } else if (reaction.emoji.name === '⬇️' && number <= number1) {
                    if (safetyround === undefined) {
                        return message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("RED")
                            .setTitle("You lose")
                            .setDescription(`Unlucky! You lost on round ${turnno}.\n\nThe number was ${number1}\nBetter luck next time!`)
                        })
                    } else if (safetyround === 5) {
                        money.addCash(message.member.id, amounts[4])
                        money.getCash(message.member.id).then(bal => {
                            return message.channel.send({
                                embed: new MessageEmbed()
                                .setColor("RED")
                                .setTitle("You lose")
                                .setDescription(`Unlucky! You lost on round ${turnno}.\n\nThe number was ${number1}\nYou still got ${amounts[4]} ${bb.bb}!\nYour new balance is: ${parseInt(bal) + amounts[4]} ${bb.bb}.`)
                            })  
                        })
                    } else if (safetyround === 10) {
                        money.addCash(message.member.id, amounts[9])
                        money.getCash(message.member.id).then(bal => {
                            return message.channel.send({
                                embed: new MessageEmbed()
                                .setColor("RED")
                                .setTitle("You lose")
                                .setDescription(`Unlucky! You lost on round ${turnno}.\n\nThe number was ${number1}\nYou still got ${amounts[9]} ${bb.bb}!\nYour new balance is: ${parseInt(bal) + amounts[9]} ${bb.bb}.`)
                            })  
                        })
                    }  else if (safetyround === 15) {
                        money.addCash(message.member.id, amounts[14])
                        money.getCash(message.member.id).then(bal => {
                            return message.channel.send({
                                embed: new MessageEmbed()
                                .setColor("RED")
                                .setTitle("You lose")
                                .setDescription(`Unlucky! You lost on round ${turnno}.\n\nThe number was ${number1}\nYou still got ${amounts[14]} ${bb.bb}!\nYour new balance is: ${parseInt(bal) + amounts[14]} ${bb.bb}.`)
                            })  
                        })
                    }  else if (safetyround === 20) {
                        money.addCash(message.member.id, amounts[19])
                        money.getCash(message.member.id).then(bal => {
                            return message.channel.send({
                                embed: new MessageEmbed()
                                .setColor("RED")
                                .setTitle("You lose")
                                .setDescription(`Unlucky! You lost on round ${turnno}.\n\nThe number was ${number1}\nYou still got ${amounts[19]} ${bb.bb}!\nYour new balance is: ${parseInt(bal) + amounts[19]} ${bb.bb}.`)
                            })  
                        })
                    } 
                    i = 1;
                } else if (reaction.emoji.name === '⏹️') {
                    money.addCash(message.member.id, amounts[turnno - 1])
                    money.getCash(message.member.id).then(bal => {
                        return message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("GREEN")
                            .setTitle("Cash Out!")
                            .setDescription(`Congratulations! You cashed out at turn: ${turnno}\n\nYou got ${amounts[turnno - 1]} ${bb.bb}\nYour new balance is: ${parseInt(bal) + amounts[turnno - 1]}.`)
                        })
                    })
                    i = 1;
                }
            }
        }) 
    })
    }
}
