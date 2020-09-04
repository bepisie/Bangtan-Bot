const discord = require('discord.js');
const rm = require('discord.js-reaction-menu');

module.exports = {
    name: 'help',
    description: 'Shows a list of all the other help commands!',
    args: false,
    usage: '',
    time: 1000000,
    guildOnly: false,
    cooldown: 5,
    aliases: ['commands'],
    accessibleBy: 'Everyone',
    category: 'Help',
    run: async(client, message, args, PREFIX) => {
        if (message.channel.type === 'text') {

            
            let embed;
            let commands = [];
            commands = client.commands.filter(cmd => cmd.category === 'Help');
            let funcommands = [];
            funcommands = client.commands.filter(cmd => cmd.category === 'Fun');
            let admincommands = [];
            admincommands = client.commands.filter(cmd => cmd.category === 'Admin');
            let imagecommands = [];
            imagecommands = client.commands.filter(cmd => cmd.category === 'Image');
            let utilitycommands = [];
            utilitycommands = client.commands.filter(cmd => cmd.category === 'Utility');
            let musiccommands = [];
            musiccommands = client.commands.filter(cmd => cmd.category === 'Music');
            let marriagecommands = [];
            marriagecommands = client.commands.filter(cmd => cmd.category === 'Marriage');
            let currencycommands = [];
            currencycommands = client.commands.filter(cmd => cmd.category === 'Currency');
            let nsfwcommands;
            nsfwcommands = client.commands.filter(cmd => cmd.category === 'Nsfw')
            let settingscommands = [];
            settingscommands = client.commands.filter(cmd => cmd.category === 'Settings');
            
            if (message.channel.nsfw) {
                embed = new discord.MessageEmbed()
                .setTitle("Help!")
                .setColor('RANDOM')
                .setDescription("If a set has over 25 commands, it will just be shown as a list. Use `?cmd` to see all the info about it.")
                .addField(`Page 1`, `You're here right now!`)
                .addField(`Page 2`, `Fun Commands`)
                .addField(`Page 3`, `Utility Commands`)
                .addField(`Page 4`, `Image Commands`)
                .addField(`Page 5`, `Marriage Commands`)
                .addField(`Page 6`, `Currency Commands`)
                .addField(`Page 7`, `Music Commands`)
                .addField(`Page 8`, `NSFW Commands`)
                .addField(`Page 9`, `Settings Commands`)
                .addField(`Page 10`, `Admin Commands`)
                .addField("Support Server", `[Click here](https://discord.gg/Z8vEbPW)`)
                .addField("Vote!", "Please vote for our bot on top.gg! [Click here to vote!](https://top.gg/bot/718458821865111624/vote)")
                .setFooter("Page 1 | Bangtan Bot")
            } else {
                embed = new discord.MessageEmbed()
                .setTitle("Help!")
                .setColor('RANDOM')
                .setDescription("If a set has over 25 commands, it will just be shown as a list. Use `?cmd` to see all the info about it.")
                .addField(`Page 1`, `You're here right now!`)
                .addField(`Page 2`, `Fun Commands`)
                .addField(`Page 3`, `Utility Commands`)
                .addField(`Page 4`, `Image Commands`)
                .addField(`Page 5`, `Marriage Commands`)
                .addField(`Page 6`, `Currency Commands`)
                .addField(`Page 7`, `Music Commands`)
                .addField(`Page 8`, `Settings Commands`)
                .addField(`Page 9`, `Admin Commands`)
                .addField("Support Server", `[Click here](https://discord.gg/Z8vEbPW)`)
                .addField("Vote!", "Please vote for our bot on top.gg! [Click here to vote!](https://top.gg/bot/718458821865111624/vote)")
                .setFooter("Page 1 | Bangtan Bot")
            }

            let embed2 = new discord.MessageEmbed()
                .setTitle("Fun Commands!")
                .setColor('RANDOM')
                .addField("How to use:", "The first word is the command (ex: clear), everything after is a variable (eg: [user] = a tagged user)\n**<> = optional**\n**[] = necessary**")
                .setFooter("Page 2 | Bangtan Bot")
            funcommands.forEach(cmd => {
                embed2.addField(`${cmd.name} ${cmd.usage ? cmd.usage : ''}`, cmd.description)
            });

            let embed3 = new discord.MessageEmbed()
                .setTitle("Utility Commands!")
                .setColor('RANDOM')
                .setFooter("Page 3 | Bangtan Bot")
                let util = []
                utilitycommands.forEach(cmd => {
                    util.push(`\`${cmd.name}\``)
                })
                embed3.setDescription(`${util.join(", ")}`)

            let embed4 = new discord.MessageEmbed()
                .setTitle("Image Commands!")
                .setColor('RANDOM')
                .addField("How to use:", "The first word is the command (ex: clear), everything after is a variable (eg: [user] = a tagged user)\n**<> = optional**\n**[] = necessary**")
                .setFooter("Page 4 | Bangtan Bot")
            imagecommands.forEach(cmd => {
                embed4.addField(`${cmd.name} ${cmd.usage ? cmd.usage : ''}`, cmd.description)
            });

            let embed5 = new discord.MessageEmbed()
                .setTitle("Marriage Commands!")
                .setColor('RANDOM')
                .addField("How to use:", "The first word is the command (ex: clear), everything after is a variable (eg: [user] = a tagged user)\n**<> = optional**\n**[] = necessary**")
                .setFooter("Page 5 | Bangtan Bot")
            marriagecommands.forEach(cmd => {
                embed5.addField(`${cmd.name} ${cmd.usage ? cmd.usage : ''}`, cmd.description)
            });

            let cembed = new discord.MessageEmbed()
                .setTitle("Currency Commands!")
                .setColor('RANDOM')
                .addField("How to use:", "The first word is the command (ex: clear), everything after is a variable (eg: [user] = a tagged user)\n**<> = optional**\n**[] = necessary**")
                .setFooter("Page 6 | Bangtan Bot")
            currencycommands.forEach(cmd => {
                cembed.addField(`${cmd.name} ${cmd.usage ? cmd.usage : ''}`, cmd.description)
            });

            let embed6 = new discord.MessageEmbed()
                .setTitle("Music Commands!")
                .setColor('RANDOM')
                .addField("How to use:", "The first word is the command (ex: clear), everything after is a variable (eg: [user] = a tagged user)\n**<> = optional**\n**[] = necessary**")
                .setFooter("Page 7 | Bangtan Bot")
            musiccommands.forEach(cmd => {
                embed6.addField(`${cmd.name} ${cmd.usage ? cmd.usage : ''}`, cmd.description)
            });

            let embed7 = new discord.MessageEmbed()
                .setTitle("Settings Commands!")
                .setColor('RANDOM')
                .addField("How to use:", "The first word is the command (ex: clear), everything after is a variable (eg: [user] = a tagged user)\n**<> = optional**\n**[] = necessary**")
                if (message.channel.nsfw) {
                    embed7.setFooter("Page 9 | Bangtan Bot")
                } else {
                    embed7.setFooter("Page 8 | Bangtan Bot")
                }
            settingscommands.forEach(cmd => {
                embed7.addField(`${cmd.name} ${cmd.usage ? cmd.usage : ''}`, cmd.description)
            });

            let embed8 = new discord.MessageEmbed()
                .setTitle("Admin Commands!")
                .setColor('RANDOM')
                .addField("How to use:", "The first word is the command (ex: clear), everything after is a variable (eg: [user] = a tagged user)\n**<> = optional**\n**[] = necessary**")
                if (message.channel.nsfw) {
                    embed8.setFooter("Page 10 | Bangtan Bot")
                } else {
                    embed8.setFooter("Page 9 | Bangtan Bot")
                }
            admincommands.forEach(cmd => {
                embed8.addField(`${cmd.name} ${cmd.usage ? cmd.usage : ''}`, cmd.description)
            });

            if (message.channel.nsfw) {
                let embed9 = new discord.MessageEmbed()
                    .setTitle("NSFW Commands!")
                    .setColor('RANDOM')
                    .addField("How to use:", "The first word is the command (ex: clear), everything after is a variable (eg: [user] = a tagged user)\n**<> = optional**\n**[] = necessary**\n\n**Note:** These commands and this help page can only be accessed in NSFW channels")
                    .setFooter("Page 8 | Bangtan Bot")
                    nsfwcommands.forEach(cmd => {
                    embed9.addField(`${cmd.name} ${cmd.usage ? cmd.usage : ''}`, cmd.description)
                });

                if (args[0] === '2') return message.channel.send(embed2)
                if (args[0] === '3') return message.channel.send(embed3)
                if (args[0] === '4') return message.channel.send(embed4)
                if (args[0] === '5') return message.channel.send(embed5)
                if (args[0] === '6') return message.channel.send(cembed)
                if (args[0] === '7') return message.channel.send(embed6)
                if (args[0] === '8') return message.channel.send(embed9)
                if (args[0] === '9') return message.channel.send(embed7)
                if (args[0] === '10') return message.channel.send(embed8)

                if (args[0] === 'full') {
                    message.channel.send(embed2)
                    message.channel.send(embed3)
                    message.channel.send(embed4)
                    message.channel.send(embed5)
                    message.channel.send(cembed)
                    message.channel.send(embed6)
                    message.channel.send(embed9)
                    message.channel.send(embed7)
                    message.channel.send(embed8)
                }

                if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
                    embed: embed
                    .setColor("RED")
                    .setDescription("**Please type a number after correlating to the page you want to see (ex `?help 2`)!**")
                }) 

            if (args[0] !== 'full') new rm.menu(message.channel, message.author.id, [embed, embed, embed2, embed2, embed3, embed3, embed4, embed4, embed5, embed5, cembed, cembed, embed6, embed6, embed9, embed9, embed7, embed7, embed8, embed8], 120000)
            } else {
                if (args[0] === '2') return message.channel.send(embed2)
                if (args[0] === '3') return message.channel.send(embed3)
                if (args[0] === '4') return message.channel.send(embed4)
                if (args[0] === '5') return message.channel.send(embed5)
                if (args[0] === '6') return message.channel.send(cembed)
                if (args[0] === '7') return message.channel.send(embed6)
                if (args[0] === '8') return message.channel.send(embed7)
                if (args[0] === '9') return message.channel.send(embed8)

                if (args[0] === 'full') {
                    message.channel.send(embed2)
                    message.channel.send(embed3)
                    message.channel.send(embed4)
                    message.channel.send(embed5)
                    message.channel.send(cembed)
                    message.channel.send(embed6)
                    message.channel.send(embed7)
                    message.channel.send(embed8)
                }

                if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
                    embed: embed
                    .setColor("RED")
                    .setDescription("**Please type a number after correlating to the page you want to see (ex `?help 2`)!**")
                }) 

            if (args[0] !== 'full') new rm.menu(message.channel, message.author.id, [embed, embed, embed2, embed2, embed3, embed3, embed4, embed4, embed5, embed5, cembed, cembed, embed6, embed6, embed7, embed7, embed8, embed8], 120000)
            }
            
        } else {
            message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription("You cannot use ?help in DMs. Please use it in a server!")
            })
        }
    }
};