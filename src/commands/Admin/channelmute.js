const discord = require("discord.js");
const ms = require("ms");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'channelmute',
    description: 'Mutes a channel!',
    args: true,
    usage: '[channel mention]',
    guildOnly: true,
    cooldown: 0,
    accessibleBy: 'Moderators',
    category: 'Admin',
    permRequirement: 'MANAGE_CHANNELS',
    run: async (client, message, args) => {

        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("I need the permission MANAGE_CHANNELS to run this command!")
        })
        
        if (message.guild.roles.cache.find(r => r.name === "ARMY")) {
            await message.mentions.channels.first().createOverwrite(message.guild.roles.cache.find(role => role.name === "ARMY"), {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false 
            })
            message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription(`<#${message.mentions.channels.first().id}> has been muted! Please use '?channelunmute' to unmute the channel`)
        });
        } else if (message.guild.roles.cache.find(r => r.name === "Member")) {
            await message.mentions.channels.first().createOverwrite(message.guild.roles.cache.find(role => role.name === "Member"), {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false 
            })
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription(`<#${message.mentions.channels.first().id}> has been muted! Please use '?channelunmute' to unmute the channel`)
            });
        } else return;
    }
}
