const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'hardban',
    description: 'Bans a member from the server and deletes 7 days of their message history!',
    args: true,
    usage: '[member] <reason>',
    guildOnly: true,
    cooldown: 0,
    aliases: ['hb'],
    accessibleBy: 'Moderators',
    category: 'Admin',
    permRequirement: 'BAN_MEMBERS',
    run: async(client, message, args, PREFIX) => {

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("I need the permission BAN_MEMBERS to run this command!")
        })
        
        if (!message.mentions.members.first()) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("Specify a user to ban!")
        });

        var member = message.mentions.members.first();

        if (member.hasPermission('BAN_MEMBERS')) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You don't have permission to do that!")
        });

        let reason = message.content.slice (PREFIX.length + member.toString().length + 5);

        message.channel.send({
            embed: new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`${member.displayName} has been banned!`)
        });
        
        if (args[1]) {
            member.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`You have been banned from ${message.guild.name} because of: \n` + reason)
            }).then (d_message => {
                member.ban({reason: reason, days: 1 });
            })
        } else {
            member.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`You have been banned from ${message.guild.name}`)
            }).then (d_message => {
                member.ban({ days: 1 });
            })
        }
    }
}