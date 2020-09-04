const discord = require("discord.js");

module.exports = {
    name: 'kiss',
    description: 'Get a kiss from Bangtan Bot, or kiss someone else!',
    args: false,
    usage: '<member>',
    guildOnly: false,
    cooldown: 2,
    accessibleBy: 'Everyone',
    category: 'Fun',
    run: async(client, message, args) => {
        let array = ["https://media1.tenor.com/images/35a32a0fcab81560d9472d38350f74b0/tenor.gif?itemid=13454351", "https://media.tenor.com/images/c34c84a6fb71cb394e2eb54656446654/tenor.gif", "https://media.tenor.com/images/7e49d52d2810c6d800a14d517329d2f7/tenor.gif", "https://media1.tenor.com/images/d1a11805180742c70339a6bfd7745f8d/tenor.gif?itemid=4883557", "https://media1.tenor.com/images/097e3800d3050d9f1284619972b11d6b/tenor.gif?itemid=16800168", "https://media1.tenor.com/images/ef9687b36e36605b375b4e9b0cde51db/tenor.gif?itemid=12498627", "https://media1.tenor.com/images/78095c007974aceb72b91aeb7ee54a71/tenor.gif?itemid=5095865", "https://media1.tenor.com/images/1306732d3351afe642c9a7f6d46f548e/tenor.gif?itemid=6155670", "https://media1.tenor.com/images/621ceac89636fc46ecaf81824f9fee0e/tenor.gif?itemid=4958649", "https://media1.tenor.com/images/7fd98defeb5fd901afe6ace0dffce96e/tenor.gif?itemid=9670722", "https://media.tenor.com/images/ca7aba82fb5185934e49928b21b78772/tenor.gif", "https://media1.tenor.com/images/f813e6dd7f607d18a4b257cc851c2abf/tenor.gif?itemid=5450137"];

        if (message.mentions.members.first() != null) {
            let embed = new discord.MessageEmbed()
                .setDescription(`*${message.author.toString()} kisses ${message.mentions.members.first().toString()} <3*`)
                .setImage(`${array[Math.floor(Math.random() * array.length)]}`)
            message.channel.send(embed)
            message.delete();
        } else {
            let embed = new discord.MessageEmbed()
                .setDescription(`*kisses ${message.author.toString()} <3*`)
                .setImage(`${array[Math.floor(Math.random() * array.length)]}`)
            message.channel.send(embed)
            message.delete();
        }
    }
}