const discord = require("discord.js")

module.exports = {
    name: 'request',
    description: 'Send a request to Bangtan Bot\'s developer (as long as they are in your server)!',
    args: true,
    usage: '[request]',
    guildOnly: false,
    cooldown: 30,
    aliases: ['query'],
    accessibleBy: 'Everyone',
    category: 'Utility',
    run: async(client, message, args) => {
        let myserver = client.guilds.cache.get("718397441904345110")
        const me = myserver.members.cache.find(m => m.id === '372653142912794626');
        if (!args[0]) return message.reply("Please input a request");
        const parts = message.content.split(" ");
        const request = parts.slice(1).join(" ");
        me.send(`You have a new request from ${message.author.tag}!\n > ` + request);
        message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription("Request sent sucessfully!")
        });
    }
}