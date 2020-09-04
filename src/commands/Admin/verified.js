const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'verified',
    description: '',
    args: false,
    usage: '[member] <reason>',
    guildOnly: true,
    cooldown: 0,
    aliases: ['verify'],
    accessibleBy: 'Everyone',
    category: 'N/A',
    permRequirement: '',
    run: async(client, message, args, PREFIX) => {

        if (message.guild.id !== '691582326966190160') return;

        let member = message.member;
        if (member.roles.cache.find(r => r.id === '712414130698584070')) {
            let toRemove = message.guild.roles.cache.find(r => r.id === '727970273697071175')
            member.roles.remove(toRemove)
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("GREEN")
                .setDescription("Role: `Unverified Members` removed")
            })
        } else {
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription("You are not verified. To verify, do `\verify`")
            })
        }
        
    }
}