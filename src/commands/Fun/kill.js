const discord = require("discord.js");

module.exports = {
    name: 'kill',
    description: 'Kill someone!',
    args: false,
    usage: '<member>',
    guildOnly: false,
    cooldown: 2,
    aliases: ["oof"],
    accessibleBy: 'Everyone',
    category: 'Fun',
    run: async(client, message, args) => {
        let array = ["https://cdn.discordapp.com/attachments/725285219929948181/738332904144371792/giphy.gif", "https://cdn.discordapp.com/attachments/725285219929948181/738332903812890714/tenor_3.gif", "https://cdn.discordapp.com/attachments/725285219929948181/738332903427276881/original.gif", "https://cdn.discordapp.com/attachments/725285219929948181/738332903074693140/tenor_2.gif", "https://cdn.discordapp.com/attachments/725285219929948181/738332902806257744/90354-1.gif"];

        if (message.mentions.members.first() != null) {
            let embed = new discord.MessageEmbed()
                .setDescription(`*${message.author.toString()} kills ${message.mentions.members.first().toString()} >:3*`)
                .setImage(`${array[Math.floor(Math.random() * array.length)]}`)
            message.channel.send(embed)
            message.delete();
        } else {
            let embed = new discord.MessageEmbed()
                .setDescription(`*kills ${message.author.toString()} >:3*`)
                .setImage(`${array[Math.floor(Math.random() * array.length)]}`)
            message.channel.send(embed)
            message.delete();
        }
    }
}