const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const ms = require("ms")
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'fight',
    description: 'Fight for money!',
    args: true,
    usage: '[user] [amount]',
    guildOnly: true,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, anChan, PREFIX) => {
        var array = ['https://cdn.discordapp.com/attachments/729106233256050760/737304379677343774/Fighting_1.gif', 'https://cdn.discordapp.com/attachments/729106233256050760/737304528180871198/fighting_2.gif', 'https://cdn.discordapp.com/attachments/729106233256050760/737304681994256384/fighting_3.gif', 'https://cdn.discordapp.com/attachments/729106233256050760/737304796305948702/fighting_4.gif', 'https://cdn.discordapp.com/attachments/729106233256050760/737304958243962900/fighting_5.gif'];
        var winnergif = ['https://cdn.discordapp.com/attachments/729106233256050760/737307065822871682/winner_1.gif', 'https://cdn.discordapp.com/attachments/729106233256050760/737308112234741840/winning_w.gif', 'https://cdn.discordapp.com/attachments/729106233256050760/737309543507427378/winner_3.gif', 'https://cdn.discordapp.com/attachments/729106233256050760/737310005497298974/winner_4.gif', 'https://cdn.discordapp.com/attachments/729106233256050760/737310678657925158/winner_5.gif']
        if (!message.mentions.members.first()) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You need to mention a user to fight!")
        })

        if (message.member.id === message.mentions.members.first().id) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You can't fight yourself!")
        })

        if (args[1] === `<@!${message.mentions.members.first().id}>`) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("The format is ?fight [person] [amount]")
        })

        if (!args[1] || parseInt(args[1] === NaN)) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You need to put a bet on!")
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
            if (parseInt(args[1]) < 10) return message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`You have to bet a minimum of 10.`)
            })
            money.getCash(user.id).then(async balance => {
                if (balance < args[1]) return message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`The person you want to fight can't afford to, they only have ${(parseInt(balance))} ${bb.bb}!`)
                })
                var messagefight = await message.channel.send({
                    embed: new MessageEmbed()
                    .setTitle("Fight!")
                    .setColor("RANDOM")
                    .setImage(`${array[Math.floor(Math.random() * array.length)]}`)
                    .setDescription(`<@${user.id}>, <@${message.member.id}> wants to fight you for ${(parseInt(args[1]))} ${bb.bb}. Do you accept?`)
                })
        
                await messagefight.react('✅')
                await messagefight.react('❌')
        
                let reactionFilter = (reaction, user2) => (user2.id === user.id) && !user.bot;
                let reaction = (await messagefight.awaitReactions(reactionFilter, { max: 1 })).first();
        
                if (reaction.emoji.name === '✅') {
                    money.removeCash(message.member.id, args[1])
                    money.removeCash(user.id, args[1])
                    var winner = Math.ceil(Math.random() * 100);
                    var winner2 = winner>50 ? user : message.member;
                    var message2 = await message.channel.send({
                        embed: new MessageEmbed()
                        .setTitle("Fight!")
                        .setColor("RANDOM")
                        .setDescription("They're fighting! Everyone stand back!")
                        .setImage(`${array[Math.floor(Math.random() * array.length)]}`)
                    })
                    setTimeout(function (){
                        message2.edit({
                            embed: new MessageEmbed()
                            .setTitle("Fight!")
                            .setColor("RANDOM")
                            .setDescription(`The winner is ${winner2}! You won ${(parseInt(args[1]) * 2)} ${bb.bb}.`)
                            .setImage(`${winnergif[Math.floor(Math.random() * winnergif.length)]}`)
                        })
            
                        money.addCash(winner2.id, parseInt(args[1]) * 2)
                    }, 5000)
                }
            })
        })
    }
}
