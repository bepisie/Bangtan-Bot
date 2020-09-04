const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'kick',
    description: 'Kicks a member from a server!',
    args: true,
    usage: '[member] <reason>',
    guildOnly: true,
    cooldown: 0,
    aliases: ['k'],
    accessibleBy: 'Moderators',
    category: 'Admin',
    permRequirement: 'KICK_MEMBERS',
    run: async(client, message, args, PREFIX) => {
        var memberKick = message.mentions.members.first();

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("I need the permission KICK_MEMBERS to run this command!")
        })

        if (!message.mentions.members.first()) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("Specify a user to kick!")
        });

        if (memberKick.hasPermission('KICK_MEMBERS')) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You don't have permission to do that!")
        });

        let reasonkick = message.content.slice (PREFIX.length + memberKick.toString().length + 5);

        message.channel.send({
            embed: new MessageEmbed()
            .setColor("GREEN")
            .setDescription(memberKick.displayName + " has been kicked!")
        });

        if (args[1]) {
            memberKick.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`You have been kicked from ${message.guild.name} because of: \n` + reasonkick)
            }).then (d_message => {
                memberKick.kick(reasonkick);
            })
        } else {
            memberKick.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`You have been kicked from ${message.guild.name}`)
            }).then (d_message => {
                memberKick.kick();
            })
        }
    }
}