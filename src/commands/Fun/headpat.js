const discord = require("discord.js");

module.exports = {
    name: 'headpat',
    description: 'Get a headpat from Bangtan Bot, or headpat someone else!',
    args: false,
    usage: '<member>',
    guildOnly: false,
    cooldown: 2,
    aliases: ["pat"],
    accessibleBy: 'Everyone',
    category: 'Fun',
    run: async(client, message, args) => {
        let array = ["https://media.discordapp.net/attachments/718121831563001857/719555707665514566/giphy_10.gif?width=448&height=293", "https://media.discordapp.net/attachments/718121831563001857/719555697121034260/200.gif?width=320&height=180", "https://media.discordapp.net/attachments/718121831563001857/719555695090860062/K_B_wuNrhb-8-Tj3JI4Mx7DhgFugx8pz-JNqeRLoNtM.gif?width=412&height=238", "https://media.discordapp.net/attachments/718121831563001857/719555686660309083/xecujg421ruz.gif?width=486&height=273", "https://media.discordapp.net/attachments/718121831563001857/719555682831171624/tenor_33.gif?width=432&height=243", "https://media.discordapp.net/attachments/718121831563001857/719556403878035457/kqGZeeZ.gif?width=360&height=202"];

        if (message.mentions.members.first() != null) {
            let embed = new discord.MessageEmbed()
                .setDescription(`*${message.author.toString()} headpats ${message.mentions.members.first().toString()} <3*`)
                .setImage(`${array[Math.floor(Math.random() * array.length)]}`)
            message.channel.send(embed)
            message.delete();
        } else {
            let embed = new discord.MessageEmbed()
                .setDescription(`*headpats ${message.author.toString()} <3*`)
                .setImage(`${array[Math.floor(Math.random() * array.length)]}`)
            message.channel.send(embed)
            message.delete();
        }
    }
}