const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'unban',
    description: 'Unbans a member from the server!',
    args: true,
    usage: '[member id] <reason>',
    guildOnly: true,
    cooldown: 0,
    aliases: ['ub'],
    accessibleBy: 'Moderators',
    category: 'Admin',
    permRequirement: 'BAN_MEMBERS',
    run: async(client, message, args, PREFIX) => {
        var member = args[0];
        let reason = message.content.slice (PREFIX.length + member.toString().length + 5);
        
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("I need the permission BAN_MEMBERS to run this command!")
        })

        if (!args[0]) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You need to give the ID of the user you want to unban!")
        });

        message.channel.send({
            embed: new MessageEmbed()
            .setColor("GREEN")
            .setDescription(member + " has been unbanned!")
        });
        if (args[1]) {
            message.guild.members.unban(member, reason);
        } else {
            message.guild.members.unban(member);
        }
    }
}