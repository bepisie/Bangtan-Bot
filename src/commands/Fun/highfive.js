const discord = require("discord.js");

module.exports = {
    name: 'highfive',
    description: 'Get a highfive from Bangtan Bot, or highfive someone else!',
    args: false,
    usage: '<member>',
    guildOnly: false,
    cooldown: 2,
    accessibleBy: 'Everyone',
    category: 'Fun',
    run: async(client, message, args) => {
        let array = ["https://media1.tenor.com/images/66c229a0a5a852a841c4181bc4a79543/tenor.gif?itemid=7572343", "https://media1.tenor.com/images/b714d7680f8b49d69b07bc2f1e052e72/tenor.gif?itemid=13400356", "https://media1.tenor.com/images/7b1f06eac73c36721912edcaacddf666/tenor.gif?itemid=10559431", "https://media1.tenor.com/images/6df51ba293b70e1ee208d3b6390a4ae0/tenor.gif?itemid=14638955", "https://media1.tenor.com/images/1420d843e90e73d303f082405af0be82/tenor.gif?itemid=14364215", "https://media1.tenor.com/images/317e6b7974a3ae95cb402b2044bb1ff3/tenor.gif?itemid=13078097"];

        if (message.mentions.members.first() != null) {
            let embed = new discord.MessageEmbed()
                .setDescription(`*${message.author.toString()} highfives ${message.mentions.members.first().toString()} <3*`)
                .setImage(`${array[Math.floor(Math.random() * array.length)]}`)
            message.channel.send(embed)
            message.delete();
        } else {
            let embed = new discord.MessageEmbed()
                .setDescription(`*highfives ${message.author.toString()} <3*`)
                .setImage(`${array[Math.floor(Math.random() * array.length)]}`)
            message.channel.send(embed)
            message.delete();
        }
    }
}