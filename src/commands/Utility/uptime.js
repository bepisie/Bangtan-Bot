const Discord = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: 'uptime',
    description: 'Find out how long the bot has been up!',
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 2,
    accessibleBy: 'Everyone',
    category: 'Utility',
    run: async(client, message, args) => {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

       message.channel.send({
           embed: new Discord.MessageEmbed()
           .setColor("BLUE")
           .setDescription(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`)
       })
    }
}