const Discord = require("discord.js")
const money = require("../../../database/sql")

module.exports = {
    name: 'getwarn',
    description: 'Gets a member\'s warnings!',
    args: true,
    usage: '<member>',
    guildOnly: true,
    cooldown: 0,
    accessibleBy: 'Moderators',
    category: 'Admin',
    permRequirement: 'KICK_MEMBERS',
    aliases: ['warns', 'getwarns'],
    run: async(client, message, args) => {
        let user = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0])

        money.getWarn(user.id, message.guild.id).then(async (warns) => {

            if (warns === 'no warnings') {
                return message.channel.send({
                    embed: new Discord.MessageEmbed()
                    .setTitle(user.nickname ? user.nickname : user.user.username)
                    .setDescription("This user has no warnings!")
                    .setColor("BLUE")
                })
            }

            let i = 1
            let embed = new Discord.MessageEmbed()
            .setTitle(user.nickname ? user.nickname : user.user.username)
            .setColor("BLUE")
            
            warns.forEach(warn => {
                embed.addField(`**${i} - ID: ${warn.warnID}**`, `\nReason: **${warn.reason}**\nWarned by: **${warn.warnedby}**\nTime: **${warn.time} (UTC)**\n\n`)
                i = i + 1
            })

            message.channel.send(embed)
        })
    }
}