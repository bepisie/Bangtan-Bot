const discord = require("discord.js");

module.exports = {
    name: 'hug',
    description: 'Get a hug from Bangtan Bot, or hug someone else!',
    args: false,
    usage: '<member>',
    guildOnly: false,
    cooldown: 2,
    aliases: ["hugs"],
    accessibleBy: 'Everyone',
    category: 'Fun',
    run: async(client, message, args) => {
        let array = ["https://media.tenor.com/images/9b620e36872db80072f07e987f63bd39/tenor.gif", "https://media1.tenor.com/images/304d8bf0315c3096603afd7e6562833c/tenor.gif?itemid=12304006", "https://media1.tenor.com/images/f20151a1f7e003426ca7f406b6f76c82/tenor.gif?itemid=13985247", "https://media1.tenor.com/images/eacc773d28ccf5e68e64b1012e361b98/tenor.gif?itemid=11891586", "https://media.tenor.com/images/40fbc34a43f8659fa247b45729cb7242/tenor.gif", "https://cdn.discordapp.com/attachments/718121831563001857/719551786142400542/48c1c1b06ebac21d329560b3bf72dabe.gif", "https://cdn.discordapp.com/attachments/718121831563001857/719551644118810665/giphy_8.gif"];
        if (args[0] && message.mentions.members === null) return message.channel.send({
            embed: new discord.MessageEmbed()
            .setColor("RED")
            .setDescription("You need to mention someone!")
        })
        if (message.mentions.members.first() != null) {
            let embed = new discord.MessageEmbed()
                .setDescription(`*${message.author.toString()} hugs ${message.mentions.members.first().toString()} <3*`)
                .setImage(`${array[Math.floor(Math.random() * array.length)]}`)
            message.channel.send(embed)
            message.delete();
        } else {
            let embed = new discord.MessageEmbed()
                .setDescription(`*hugs ${message.author.toString()} <3*`)
                .setImage(`${array[Math.floor(Math.random() * array.length)]}`)
            message.channel.send(embed)
            message.delete();
        }
    }
}