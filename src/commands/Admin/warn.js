const Discord = require("discord.js")
const money = require("../../../database/sql")

module.exports = {
    name: 'warn',
    description: 'Adds a warning for a member!',
    args: true,
    usage: '<member> <reason>',
    guildOnly: true,
    cooldown: 0,
    accessibleBy: 'Moderators',
    category: 'Admin',
    permRequirement: 'KICK_MEMBERS',
    run: async(client, message, args) => {
        let user = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0])
        let reason = args.slice(1).join(" ")
        let warnID = makeid(30)
        let warnedby = message.author.username
        let d = new Date()
        let time = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} - ${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        console.log(time)

        money.addWarn(user.id, message.guild.id, reason, warnID, warnedby, time)

        message.channel.send({
            embed: new Discord.MessageEmbed()
            .setTitle("Warn")
            .setColor("GREEN")
            .setDescription(`${user} has been warned for: ${reason}\nWarning ID: ${warnID}\nWarned By: ${warnedby}\nTime: ${time} (UTC)`)
        })

        user.send({
            embed: new Discord.MessageEmbed()
            .setTitle("Warning!")
            .setColor("RED")
            .setDescription(`You have been warned for: **${reason}** in server: **${message.guild.name}**.\nAvoid doing this in the future please!`)
        })
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}