const discord = require("discord.js");

module.exports = {
    name: 'setnick',
    description: 'Set your nickname!',
    args: true,
    usage: '<user>',
    guildOnly: false,
    cooldown: 0,
    aliases: ['nick', 'nickname', 'setnickname'],
    accessibleBy: 'Everyone',
    category: 'Utility',
    run: async(client, message, args) => {
        let member = message.mentions.members.first();

        if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription('I need the permission MANAGE_NICKNAMES to use this command!')
        });

        if (message.author.id === message.guild.ownerID && !member) return message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription('I can\'t change your nickname.')
        });

        if (member) {
            const parts = message.content.split(" ");
            const request = parts.slice(2).join(" ");
            if (request.length >= 32) return message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Your nickname must be less than 32 characters.")
            })
            member.setNickname(request)
            message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${member.user.tag}'s nickname has been set to: ${request}`)
            })
        } else {
            const parts = message.content.split(" ");
            const request = parts.slice(1).join(" ");
            if (request.length >= 32) return message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Your nickname must be less than 32 characters.")
            })
            message.member.setNickname(request)
            message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.member.user.tag}'s nickname has been set to: ${request}`)
            })
        }
    }
}