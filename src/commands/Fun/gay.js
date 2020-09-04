const discord = require("discord.js");

module.exports = {
    name: 'gay',
    description: 'Tells you your gay percentage or someone elses!',
    args: false,
    usage: '<member>',
    guildOnly: false,
    cooldown: 5,
    accessibleBy: 'Everyone',
    category: 'Fun',
    run: async(client, message, args) => {
        var gayvalue = Math.ceil(Math.random() * 100);
        if(message.mentions.members.first() != null) {
            message.delete();
            message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`${message.mentions.members.first().toString()} is ${gayvalue.toString()}% gay! 🌈`)
            });
        } else {
            message.delete();
            message.channel.send({
                embed: new discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`You are ${gayvalue.toString()}% gay! 🌈`)
            });
        } 
    }
}