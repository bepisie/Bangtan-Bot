const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const ms = require("ms")
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'blackjack',
    description: 'Play blackjack for money!',
    args: true,
    aliases: ['bj'],
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
        var user = message.member;
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
            let rednumber = ['', '<:rK:737979732351778816>', '<:rQ:737979499173642311>', '<:rJ:737979783648116868>', '<:rA:737980082680758294>', '<:r9:737980114259935242>', '<:r8:737980182551592970>', '<:r7:737980210783191051>', '<:r6:737980239157919775>', '<:r5:737980273131782185>', '<:r4:737980306618974282>', '<:r3:737980338105483264>', '<:r2:737980366639464478>', '<:r10:737980395185766483>']
            let blacknumber = ['', '<:bK:737980716859785287>', '<:bQ:737980617446391808>', '<:bJ:737980738783412234>', '<:bA:737980779291738162>', '<:b9:737980800297074710>', '<:b8:737980820790444093>', '<:b7:737980841518694461>', '<:b6:737980866298511391>', '<:b5:737980892265316433>', '<:b4:737980910623784991>', '<:b3:737980928495714357>', '<:b2:737980946447335494>', '<:b10:737980960540327986>']
            let suit = ['', '<:espades:737980465390026792>', '<:ehearts:737980490602250320>', '<:ediamonds:737980512697581578>', '<:eclubs:737980538815643718>']

            let card1suit = Math.ceil(Math.random() * 4)
            let card2suit = Math.ceil(Math.random() * 4)
            let card3suit = Math.ceil(Math.random() * 4)
            let card4suit = Math.ceil(Math.random() * 4)
            let card5suit = Math.ceil(Math.random() * 4)
            let dealer1suit = Math.ceil(Math.random() * 4)
            let dealer2suit = Math.ceil(Math.random() * 4)
            let dealer3suit = Math.ceil(Math.random() * 4)
            let dealer4suit = Math.ceil(Math.random() * 4)
            let dealer5suit = Math.ceil(Math.random() * 4)

            let card1number = Math.ceil(Math.random() * 13)
            let card2number = Math.ceil(Math.random() * 13) 
            let card3number = Math.ceil(Math.random() * 13) 
            let card4number = Math.ceil(Math.random() * 13) 
            let card5number = Math.ceil(Math.random() * 13)
            let dealer1number = Math.ceil(Math.random() * 13)
            let dealer2number = Math.ceil(Math.random() * 13)
            let dealer3number = Math.ceil(Math.random() * 13)
            let dealer4number = Math.ceil(Math.random() * 13)
            let dealer5number = Math.ceil(Math.random() * 13)
            
            let card1;
            let card2;
            let card3;
            let card4;
            let card5;
            let dealer1;
            let dealer2;
            let dealer3;
            let dealer4;
            let dealer5;
            let card1value;
            let card2value;
            let card3value;
            let card4value;
            let card5value;
            let dealer1value;
            let dealer2value;
            let dealer3value;
            let dealer4value;
            let dealer5value;

            if (card1suit === 1 || card1suit === 4) {
                card1 = blacknumber[card1number]
            } else {
                card1 = rednumber[card1number]
            }
            if (card2suit === 1 || card2suit === 4) {
                card2 = blacknumber[card2number]
            } else {
                card2 = rednumber[card2number]
            }
            if (card3suit === 1 || card3suit === 4) {
                card3 = blacknumber[card3number]
            } else {
                card3 = rednumber[card3number]
            }
            if (card4suit === 1 || card4suit === 4) {
                card4 = blacknumber[card4number]
            } else {
                card4 = rednumber[card4number]
            }
            if (card5suit === 1 || card5suit === 4) {
                card5 = blacknumber[card5number]
            } else {
                card5 = rednumber[card5number]
            }
            if (dealer1suit === 1 || dealer1suit === 4) {
                dealer1 = blacknumber[dealer1number]
            } else {
                dealer1 = rednumber[dealer1number]
            }
            if (dealer2suit === 1 || dealer2suit === 4) {
                dealer2 = blacknumber[dealer2number]
            } else {
                dealer2 = rednumber[dealer2number]
            }
            if (dealer3suit === 1 || dealer3suit === 4) {
                dealer3 = blacknumber[dealer3number]
            } else {
                dealer3 = rednumber[dealer3number]
            }
            if (dealer4suit === 1 || dealer4suit === 4) {
                dealer4 = blacknumber[dealer4number]
            } else {
                dealer4 = rednumber[dealer4number]
            }
            if (dealer5suit === 1 || dealer5suit === 4) {
                dealer5 = blacknumber[dealer5number]
            } else {
                dealer5 = rednumber[dealer5number]
            }

            if (card1number === 1) card1value = 10;
            if (card1number === 2) card1value = 10;
            if (card1number === 3) card1value = 10;
            if (card1number === 4) card1value = 11;
            if (card1number === 5) card1value = 9;
            if (card1number === 6) card1value = 8;
            if (card1number === 7) card1value = 7;
            if (card1number === 8) card1value = 6;
            if (card1number === 9) card1value = 5;
            if (card1number === 10) card1value = 4;
            if (card1number === 11) card1value = 3;
            if (card1number === 12) card1value = 2;
            if (card1number === 13) card1value = 10;
            
            if (card2number === 1) card2value = 10;
            if (card2number === 2) card2value = 10;
            if (card2number === 3) card2value = 10;
            if (card2number === 4) card2value = 11;
            if (card2number === 5) card2value = 9;
            if (card2number === 6) card2value = 8;
            if (card2number === 7) card2value = 7;
            if (card2number === 8) card2value = 6;
            if (card2number === 9) card2value = 5;
            if (card2number === 10) card2value = 4;
            if (card2number === 11) card2value = 3;
            if (card2number === 12) card2value = 2;
            if (card2number === 13) card2value = 10;
            
            if (card3number === 1) card3value = 10;
            if (card3number === 2) card3value = 10;
            if (card3number === 3) card3value = 10;
            if (card3number === 4) card3value = 11;
            if (card3number === 5) card3value = 9;
            if (card3number === 6) card3value = 8;
            if (card3number === 7) card3value = 7;
            if (card3number === 8) card3value = 6;
            if (card3number === 9) card3value = 5;
            if (card3number === 10) card3value = 4;
            if (card3number === 11) card3value = 3;
            if (card3number === 12) card3value = 2;
            if (card3number === 13) card3value = 10;

            if (card4number === 1) card4value = 10;
            if (card4number === 2) card4value = 10;
            if (card4number === 3) card4value = 10;
            if (card4number === 4) card4value = 11;
            if (card4number === 5) card4value = 9;
            if (card4number === 6) card4value = 8;
            if (card4number === 7) card4value = 7;
            if (card4number === 8) card4value = 6;
            if (card4number === 9) card4value = 5;
            if (card4number === 10) card4value = 4;
            if (card4number === 11) card4value = 3;
            if (card4number === 12) card4value = 2;
            if (card4number === 13) card4value = 10;

            if (card5number === 1) card5value = 10;
            if (card5number === 2) card5value = 10;
            if (card5number === 3) card5value = 10;
            if (card5number === 4) card5value = 11;
            if (card5number === 5) card5value = 9;
            if (card5number === 6) card5value = 8;
            if (card5number === 7) card5value = 7;
            if (card5number === 8) card5value = 6;
            if (card5number === 9) card5value = 5;
            if (card5number === 10) card5value = 4;
            if (card5number === 11) card5value = 3;
            if (card5number === 12) card5value = 2;
            if (card5number === 13) card5value = 10;

            if (dealer1number === 1) dealer1value = 10;
            if (dealer1number === 2) dealer1value = 10;
            if (dealer1number === 3) dealer1value = 10;
            if (dealer1number === 4) dealer1value = 11;
            if (dealer1number === 5) dealer1value = 9;
            if (dealer1number === 6) dealer1value = 8;
            if (dealer1number === 7) dealer1value = 7;
            if (dealer1number === 8) dealer1value = 6;
            if (dealer1number === 9) dealer1value = 5;
            if (dealer1number === 10) dealer1value = 4;
            if (dealer1number === 11) dealer1value = 3;
            if (dealer1number === 12) dealer1value = 2;
            if (dealer1number === 13) dealer1value = 10;
            
            if (dealer2number === 1) dealer2value = 10;
            if (dealer2number === 2) dealer2value = 10;
            if (dealer2number === 3) dealer2value = 10;
            if (dealer2number === 4) dealer2value = 11;
            if (dealer2number === 5) dealer2value = 9;
            if (dealer2number === 6) dealer2value = 8;
            if (dealer2number === 7) dealer2value = 7;
            if (dealer2number === 8) dealer2value = 6;
            if (dealer2number === 9) dealer2value = 5;
            if (dealer2number === 10) dealer2value = 4;
            if (dealer2number === 11) dealer2value = 3;
            if (dealer2number === 12) dealer2value = 2;
            if (dealer2number === 13) dealer2value = 10;
            
            if (dealer3number === 1) dealer3value = 10;
            if (dealer3number === 2) dealer3value = 10;
            if (dealer3number === 3) dealer3value = 10;
            if (dealer3number === 4) dealer3value = 11;
            if (dealer3number === 5) dealer3value = 9;
            if (dealer3number === 6) dealer3value = 8;
            if (dealer3number === 7) dealer3value = 7;
            if (dealer3number === 8) dealer3value = 6;
            if (dealer3number === 9) dealer3value = 5;
            if (dealer3number === 10) dealer3value = 4;
            if (dealer3number === 11) dealer3value = 3;
            if (dealer3number === 12) dealer3value = 2;
            if (dealer3number === 13) dealer3value = 10;

            if (dealer4number === 1) dealer4value = 10;
            if (dealer4number === 2) dealer4value = 10;
            if (dealer4number === 3) dealer4value = 10;
            if (dealer4number === 4) dealer4value = 11;
            if (dealer4number === 5) dealer4value = 9;
            if (dealer4number === 6) dealer4value = 8;
            if (dealer4number === 7) dealer4value = 7;
            if (dealer4number === 8) dealer4value = 6;
            if (dealer4number === 9) dealer4value = 5;
            if (dealer4number === 10) dealer4value = 4;
            if (dealer4number === 11) dealer4value = 3;
            if (dealer4number === 12) dealer4value = 2;
            if (dealer4number === 13) dealer4value = 10;

            if (dealer5number === 1) dealer5value = 10;
            if (dealer5number === 2) dealer5value = 10;
            if (dealer5number === 3) dealer5value = 10;
            if (dealer5number === 4) dealer5value = 11;
            if (dealer5number === 5) dealer5value = 9;
            if (dealer5number === 6) dealer5value = 8;
            if (dealer5number === 7) dealer5value = 7;
            if (dealer5number === 8) dealer5value = 6;
            if (dealer5number === 9) dealer5value = 5;
            if (dealer5number === 10) dealer5value = 4;
            if (dealer5number === 11) dealer5value = 3;
            if (dealer5number === 12) dealer5value = 2;
            if (dealer5number === 13) dealer5value = 10;
            
            let dealertotal;
            let dealercards;

            if ((dealer1value + dealer2value) >= 17) {
                dealertotal = dealer1value + dealer2value;
                dealercards = `${dealer1} ${dealer2}`
            } else if ((dealer1value + dealer2value) < 17 && (dealer1value + dealer2value) != 17 && (dealer1value + dealer2value + dealer3value) >= 17) {
                dealertotal = dealer1value + dealer2value + dealer3value;
                dealercards = `${dealer1} ${dealer2} ${dealer3}`
            } else if ((dealer1value + dealer2value + dealer3value) < 17 && (dealer1value + dealer2value + dealer3value) != 17 && (dealer1value + dealer2value + dealer3value + dealer4value) >= 17) {
                dealertotal = dealer1value + dealer2value + dealer3value + dealer4value;
                dealercards = `${dealer1} ${dealer2} ${dealer3} ${dealer4}`
            } else if ((dealer1value + dealer2value + dealer3value + dealer4value) < 17 && (dealer1value + dealer2value + dealer3value + dealer4value) != 17) {
                dealertotal = dealer1value + dealer2value + dealer3value + dealer4value + dealer5value;
                dealercards = `${dealer1} ${dealer2} ${dealer3} ${dealer4} ${dealer5}`
            }

            if ((card1value + card2value) === 21 && (dealer1value + dealer2value) === 21) {
                money.addCash(message.member.id, (parseInt(args[0])))
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("Blackjack!")
                    .setDescription(`**Draw!**\n\nYour cards: ${card1} ${card2}\nDealer's cards: ${dealer1} ${dealer2}\n\n${user}, you both got blackjack!\nYour ${bb.bb} has been returned.`)
                })
                return;
            }

            if ((card1value + card2value) === 21) {
                money.addCash(message.member.id, (parseInt(args[0] * 2)))
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Blackjack!")
                    .setDescription(`**Blackjack!**\n\nYour cards: ${card1} ${card2}\nDealer's cards: ${dealer1} ${dealer2}\n\n${user}, you won ${(parseInt(args[0] * 2))} ${bb.bb}!\nYour new balance is ${(parseInt(balance) + parseInt(args[0]))} ${bb.bb}`)
                })
                return;
            }
            if ((dealer1value + dealer2value) === 21) {
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Blackjack!")
                    .setDescription(`**You lose!**\n\nYour cards: ${card1} ${card2}\nDealer's cards: ${dealer1} ${dealer2}\n\nYour new balance is ${(parseInt(balance - (args[0])))} ${bb.bb}`)
                })
                return;
            }

            await message.channel.send({
                embed: new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Blackjack!")
                .setDescription(`Your cards: ${card1} ${card2}\nDealer's cards: ${dealer1} <:blankbacktop:737980641982808105>\n\nType 'h' to hit or 's' to stick`)
            })

            let filter = m => m.author.id === user.id;
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30 * 1000,
                errors: ['time']
            }).then(async(col) => {
                if (col.first().content.toLowerCase() == 's') {
                    if (dealertotal > 21) {
                        money.addCash(message.member.id, (parseInt(args[0] * 2)))
                        message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("GREEN")
                            .setTitle("Blackjack!")
                            .setDescription(`**Dealer went bust!**\n\nYour cards: ${card1} ${card2}\nDealer's cards: ${dealercards}\n\n${user}, you won ${(parseInt(args[0] * 2))} ${bb.bb}!\nYour new balance is ${(parseInt(balance) + parseInt(args[0]))} ${bb.bb}`)
                        })
                        return;
                    }
                    if (dealertotal === (card1value + card2value)) {
                        money.addCash(user.id, args[0])
                        message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("BLUE")
                            .setTitle("Blackjack!")
                            .setDescription(`**Draw!**\n\nYour cards: ${card1} ${card2}\nDealer's cards: ${dealercards}\n\n${user}, you drew!\nYour ${bb.bb} has been returned.`)
                        })
                        return;
                    }
                    if (dealertotal > (card1value + card2value)) {
                        message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("RED")
                            .setTitle("Blackjack!")
                            .setDescription(`**You lose!**\n\nYour cards: ${card1} ${card2}\nDealer's cards: ${dealercards}\n\nYour new balance is ${(parseInt(balance - (args[0])))} ${bb.bb}`)
                        })
                        return;
                    } else if (dealertotal < (card1value + card2value)) {
                        money.addCash(message.member.id, (parseInt(args[0] * 2)))
                        message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("GREEN")
                            .setTitle("Blackjack!")
                            .setDescription(`**You win!**\n\nYour cards: ${card1} ${card2}\nDealer's cards: ${dealer1} ${dealer2}\n\n${user}, you won ${(parseInt(args[0] * 2))} ${bb.bb}!\nYour new balance is ${(parseInt(balance) + parseInt(args[0]))} ${bb.bb}`)
                        })
                        return;
                    } 
                } else if (col.first().content.toLowerCase() == 'h') {
                    if (((card1value + card2value + card3value) > 21) && (card1value === 11 || card2value === 11 || card3value === 11)) {
                        if (card1value === 11) {
                            card1value = 1;
                        } else if (card2value === 11) {
                            card2value = 1;
                        } else if (card3value === 11) {
                            card3value = 1;
                        }
                    }
                    if ((card1value + card2value + card3value) > 21) {
                        message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("RED")
                            .setTitle("Blackjack!")
                            .setDescription(`**Bust!**\n\nYour cards: ${card1} ${card2} ${card3}\nDealer's cards: ${dealer1} ${dealer2}\n\nYour new balance is ${(parseInt(balance - (args[0])))} ${bb.bb}`)
                        })
                        return;
                    }

                    await message.channel.send({
                        embed: new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Blackjack!")
                        .setDescription(`Your cards: ${card1} ${card2} ${card3}\nDealer's cards: ${dealer1} <:blankbacktop:737980641982808105>\n\nType 'h' to hit or 's' to stick`)
                    })
        
                    let filter2 = m => m.author.id === user.id;
                    message.channel.awaitMessages(filter2, {
                        max: 1,
                        time: 30 * 1000,
                        errors: ['time']
                    }).then(async(col) => {
                        if (col.first().content.toLowerCase() == 's') {
                            if (dealertotal > 21) {
                                money.addCash(message.member.id, (parseInt(args[0] * 2)))
                                message.channel.send({
                                    embed: new MessageEmbed()
                                    .setColor("GREEN")
                                    .setTitle("Blackjack!")
                                    .setDescription(`**Dealer went bust!**\n\nYour cards: ${card1} ${card2} ${card3}\nDealer's cards: ${dealercards}\n\n${user}, you won ${(parseInt(args[0] * 2))} ${bb.bb}!\nYour new balance is ${(parseInt(balance) + parseInt(args[0]))} ${bb.bb}`)
                                })
                                return;
                            }
                            if (dealertotal === (card1value + card2value + card3value)) {
                                money.addCash(user.id, args[0])
                                message.channel.send({
                                    embed: new MessageEmbed()
                                    .setColor("BLUE")
                                    .setTitle("Blackjack!")
                                    .setDescription(`**Draw!**\n\nYour cards: ${card1} ${card2} ${card3}\nDealer's cards: ${dealercards}\n\n${user}, you drew!\nYour ${bb.bb} has been returned.`)
                                })
                                return;
                            }
                            if (dealertotal > (card1value + card2value + card3value)) {
                                message.channel.send({
                                    embed: new MessageEmbed()
                                    .setColor("RED")
                                    .setTitle("Blackjack!")
                                    .setDescription(`**You lose!**\n\nYour cards: ${card1} ${card2} ${card3}\nDealer's cards: ${dealercards}\n\nYour new balance is ${(parseInt(balance - (args[0])))} ${bb.bb}`)
                                })
                                return;
                            } else if (dealertotal < (card1value + card2value + card3value)) {
                                money.addCash(message.member.id, (parseInt(args[0] * 2)))
                                message.channel.send({
                                    embed: new MessageEmbed()
                                    .setColor("GREEN")
                                    .setTitle("Blackjack!")
                                    .setDescription(`**You win!**\n\nYour cards: ${card1} ${card2} ${card3}\nDealer's cards: ${dealercards}\n\n${user}, you won ${(parseInt(args[0] * 2))} ${bb.bb}!\nYour new balance is ${(parseInt(balance) + parseInt(args[0]))} ${bb.bb}`)
                                })
                                return;
                            } 
                        } else if (col.first().content.toLowerCase() == 'h') {
                            if (((card1value + card2value + card3value + card4value) > 21) && (card1value === 11 || card2value === 11 || card3value === 11 || card4value === 11)) {
                                if (card1value === 11) {
                                    card1value = 1;
                                } else if (card2value === 11) {
                                    card2value = 1;
                                } else if (card3value === 11) {
                                    card3value = 1;
                                } else if (card4value === 11) {
                                    card4value = 1;
                                }
                            }
                            if ((card1value + card2value + card3value + card4value) > 21) {
                                message.channel.send({
                                    embed: new MessageEmbed()
                                    .setColor("RED")
                                    .setTitle("Blackjack!")
                                    .setDescription(`**Bust!**\n\nYour cards: ${card1} ${card2} ${card3} ${card4}\nDealer's cards: ${dealer1} ${dealer2}\n\nYour new balance is ${(parseInt(balance - (args[0])))} ${bb.bb}`)
                                })
                                return;
                            }

                            await message.channel.send({
                                embed: new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle("Blackjack!")
                                .setDescription(`Your cards: ${card1} ${card2} ${card3} ${card4}\nDealer's cards: ${dealer1} <:blankbacktop:737980641982808105>\n\nType 'h' to hit or 's' to stick`)
                            })
                
                            let filter3 = m => m.author.id === user.id;
                
                            message.channel.awaitMessages(filter3, {
                                max: 1,
                                time: 30 * 1000,
                                errors: ['time']
                            }).then(async(col) => {
                                if (col.first().content.toLowerCase() == 's') {
                                    if (dealertotal > 21) {
                                        money.addCash(message.member.id, (parseInt(args[0] * 2)))
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("GREEN")
                                            .setTitle("Blackjack!")
                                            .setDescription(`**Dealer went bust!**\n\nYour cards: ${card1} ${card2} ${card3} ${card4}\nDealer's cards: ${dealercards}\n\n${user}, you won ${(parseInt(args[0] * 2))} ${bb.bb}!\nYour new balance is ${(parseInt(balance) + parseInt(args[0]))} ${bb.bb}`)
                                        })
                                        return;
                                    }
                                    if (dealertotal === (card1value + card2value + card3value + card4value)) {
                                        money.addCash(user.id, args[0])
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("BLUE")
                                            .setTitle("Blackjack!")
                                            .setDescription(`**Draw!**\n\nYour cards: ${card1} ${card2} ${card3} ${card4}\nDealer's cards: ${dealercards}\n\n${user}, you drew!\nYour ${bb.bb} has been returned.`)
                                        })
                                        return;
                                    }
                                    if (dealertotal > (card1value + card2value + card3value + card4value)) {
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("RED")
                                            .setTitle("Blackjack!")
                                            .setDescription(`**You lose!**\n\nYour cards: ${card1} ${card2} ${card3} ${card4}\nDealer's cards: ${dealercards}\n\nYour new balance is ${(parseInt(balance - (args[0])))} ${bb.bb}`)
                                        })
                                        return;
                                    } else if (dealertotal < (card1value + card2value + card3value + card4value)) {
                                        money.addCash(message.member.id, (parseInt(args[0] * 2)))
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("GREEN")
                                            .setTitle("Blackjack!")
                                            .setDescription(`**You win!**\n\nYour cards: ${card1} ${card2} ${card3} ${card4}\nDealer's cards: ${dealercards}\n\n${user}, you won ${(parseInt(args[0] * 2))} ${bb.bb}!\nYour new balance is ${(parseInt(balance) + parseInt(args[0]))} ${bb.bb}`)
                                        })
                                        return;
                                    } 
                                } else if (col.first().content.toLowerCase() == 'h') {
                                    if (((card1value + card2value + card3value + card4value + card5value) > 21) && (card1value === 11 || card2value === 11 || card3value === 11 || card4value === 11 || card5value === 11)) {
                                        if (card1value === 11) {
                                            card1value = 1;
                                        } else if (card2value === 11) {
                                            card2value = 1;
                                        } else if (card3value === 11) {
                                            card3value = 1;
                                        } else if (card4value === 11) {
                                            card4value = 1;
                                        } else if (card5value === 11) {
                                            card5value = 1;
                                        }
                                    }
                                    if ((card1value + card2value + card3value + card4value + card5value) > 21) {
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("RED")
                                            .setTitle("Blackjack!")
                                            .setDescription(`**Bust!**\n\nYour cards: ${card1} ${card2} ${card3} ${card4} ${card5}\nDealer's cards: ${dealer1} ${dealer2}\n\nYour new balance is ${(parseInt(balance - (args[0])))} ${bb.bb}`)
                                        })
                                        return;
                                    }
                                    
                                    if (dealertotal > 21) {
                                        money.addCash(message.member.id, (parseInt(args[0] * 2)))
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("GREEN")
                                            .setTitle("Blackjack!")
                                            .setDescription(`**Dealer went bust!**\n\nYour cards: ${card1} ${card2} ${card3} ${card4} ${card5}\nDealer's cards: ${dealercards}\n\n${user}, you won ${(parseInt(args[0] * 2))} ${bb.bb}!\nYour new balance is ${(parseInt(balance) + parseInt(args[0]))} ${bb.bb}`)
                                        })
                                        return;
                                    }

                                    if (dealertotal === (card1value + card2value + card3value + card4value + card5value)) {
                                        money.addCash(user.id, args[0])
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("BLUE")
                                            .setTitle("Blackjack!")
                                            .setDescription(`**Draw!**\n\nYour cards: ${card1} ${card2} ${card3} ${card4} ${card5}\nDealer's cards: ${dealercards}\n\n${user}, you drew!\nYour ${bb.bb} has been returned.`)
                                        })
                                        return;
                                    }

                                    if (dealertotal > (card1value + card2value + card3value + card4value + card5value) && dealercards.split(' ').length == 5) {
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("RED")
                                            .setTitle("Blackjack!")
                                            .setDescription(`**You lose!**\n\nYour cards: ${card1} ${card2} ${card3} ${card4} ${card5}\nDealer's cards: ${dealercards}\n\nYour new balance is ${(parseInt(balance - (args[0])))} ${bb.bb}`)
                                        })
                                        return;
                                    } else if (dealertotal < (card1value + card2value + card3value + card4value + card5value) || dealercards.split(' ').length != 5) {
                                        money.addCash(message.member.id, (parseInt(args[0] * 2)))
                                        message.channel.send({
                                            embed: new MessageEmbed()
                                            .setColor("GREEN")
                                            .setTitle("Blackjack!")
                                            .setDescription(`**5 card trick!**\n\nYour cards: ${card1} ${card2} ${card3} ${card4} ${card5}\nDealer's cards: ${dealercards}\n\n${user}, you won ${(parseInt(args[0] * 2))} ${bb.bb}!\nYour new balance is ${(parseInt(balance) + parseInt(args[0]))} ${bb.bb}`)
                                        })
                                        return;
                                    } 
                                }
                            }).catch(x => {
                                return message.channel.send({
                                    embed: new MessageEmbed()
                                    .setColor("RED")
                                    .setDescription("Blackjack timed out.")
                                })
                            })
                        }
                    }).catch(x => {
                        return message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("RED")
                            .setDescription("Blackjack timed out.")
                        })
                    })
                }
            }).catch(x => {
                return message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setDescription("Blackjack timed out.")
                })
            })
        }) 
    }
}
