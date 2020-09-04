const discord = require("discord.js");

module.exports = {
    name: 'shippercent',
    description: 'Gives the ship % of you and another, or 2 people!',
    args: true,
    usage: '[member 1] <member 2>',
    guildOnly: false,
    cooldown: 2,
    aliases: ['ship%'],
    accessibleBy: 'Everyone',
    category: 'Fun',
    run: async(client, message, args) => {
        var gayvalue = Math.ceil(Math.random() * 100);
        if (args[0] && message.mentions.members === null) return message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RED")
            .setDescription("You need to mention someone!")
        })
        if(message.mentions.members.first() != null && !args[1]) {
            message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`<@${message.member.user.id}> is ${gayvalue.toString()}% compatible with <@${message.mentions.members.first().user.id}>!`)
            });
        } else if (args[1] && message.mentions.members.first()) {
            message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`<@${message.mentions.members.first().user.id}> is ${gayvalue.toString()}% compatible with <@${message.mentions.members.last().user.id}>!`)
            });
        } else {
            message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription("you are 0% compatible with yourself, you're just lonely!")
            });
        }
    }
}