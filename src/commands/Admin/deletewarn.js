const Discord = require("discord.js")
const money = require("../../../database/sql")

module.exports = {
    name: 'deletewarn',
    description: 'Deletes a warning from the warning ID!',
    args: true,
    usage: '<warning ID>',
    guildOnly: true,
    cooldown: 0,
    accessibleBy: 'Moderators',
    category: 'Admin',
    permRequirement: 'KICK_MEMBERS',
    aliases: ['removewarn', 'removewarning', 'deletewarning'],
    run: async(client, message, args) => {
        let id = args[0]

        money.deleteWarn(id, message.guild.id)

        message.channel.send({
            embed: new Discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(`Warning: ${id} has been deleted.`)
        })
    }
}