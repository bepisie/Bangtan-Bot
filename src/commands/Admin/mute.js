const discord = require("discord.js");
const ms = require("ms");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'mute',
    description: 'Mutes a member for a specified amount of time!',
    args: true,
    usage: '[member] [time (ex. 30s)]',
    guildOnly: true,
    cooldown: 0,
    aliases: ['m'],
    accessibleBy: 'Moderators',
    category: 'Admin',
    permRequirement: 'KICK_MEMBERS',
    run: async (client, message, args) => {
        
        if (!message.guild.me.hasPermission("MANAGE_ROLES") || !message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RED")
            .setDescription("Sorry, I need the permissions MANAGE_ROLES and MANAGE_CHANNELS to run this command!")
        })
        
        var tomute = message.mentions.members.first();
        if(!tomute) return message.reply("Couldn't find user.");
        var array = [];
        let channels = message.guild.channels.cache;
        var roles = message.guild.roles.cache;
        for (const channel of channels.values()) 
        {
            array.push(channel.id);
        }
        if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("Sorry, I can't mute that person!")
        });

        if(message.guild.roles.cache.find(role => role.name === "Muted")) {
            var muterole = message.guild.roles.cache.find(role => role.name === "Muted");
            array.forEach(async (id) => {
                var channel = message.guild.channels.cache.find(channel => channel.id === id);
                await channel.createOverwrite(message.guild.roles.cache.find(role => role.name === "Muted"), {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false 
                })
            });
        } else {
            await message.guild.roles.create({ 
                data: {
                    name: "Muted", 
                    color: "#000000", 
                    permissions:[] 
                }
            }) 
            
            var muterole = message.guild.roles.cache.find(role => role.name === "Muted");

            array.forEach(async (id) => { 
                var channel = message.guild.channels.cache.find(channel => channel.id === id);
                await channel.createOverwrite(message.guild.roles.cache.find(role => role.name === "Muted"), {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false 
                })
            });
        }
        var mutetime = args[1];
        if(!mutetime) return message.channel.send({
            embed: new MessageEmbed()
            .setColor("RED")
            .setDescription("You didn't specify a time!")
        });
        await(tomute.roles.add(muterole.id)); 
        message.channel.send({
            embed: new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`)
        }); 
        
        setTimeout(function() { 
            tomute.roles.remove(muterole.id); 
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`<@${tomute.id}> has been unmuted!`)
            }); 
        }, ms(mutetime));
    }
}
