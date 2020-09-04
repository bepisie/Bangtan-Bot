const discord = require("discord.js");

module.exports = {
    name: 'hit',
    description: 'Get a hit from Bangtan Bot, or hit someone else!',
    args: false,
    usage: '<member>',
    guildOnly: false,
    cooldown: 2,
    aliases: ['slap', 'punch'],
    accessibleBy: 'Everyone',
    category: 'Fun',
    run: async(client, message, args) => {
        let array = ["https://media1.tenor.com/images/ae9f3f191fd52711dd3fa4ceb130dfff/tenor.gif?itemid=12942777", "https://media1.tenor.com/images/2487a7679b3d7d23cadcd51381635467/tenor.gif?itemid=11451829", "https://media1.tenor.com/images/cff010b188084e1faed2905c0f1634c2/tenor.gif?itemid=10161883", "https://media1.tenor.com/images/4f3603010f0071227affbf2f732d79be/tenor.gif?itemid=10769541", "https://media1.tenor.com/images/31686440e805309d34e94219e4bedac1/tenor.gif?itemid=4790446", "https://media1.tenor.com/images/477821d58203a6786abea01d8cf1030e/tenor.gif?itemid=7958720", "https://media1.tenor.com/images/53d180f129f51575a46b6d3f0f5eeeea/tenor.gif?itemid=5373994", "https://media1.tenor.com/images/d14969a21a96ec46f61770c50fccf24f/tenor.gif?itemid=5509136", "https://media1.tenor.com/images/7437caf9fb0bea289a5bb163b90163c7/tenor.gif?itemid=13595529", "https://media1.tenor.com/images/9ea4fb41d066737c0e3f2d626c13f230/tenor.gif?itemid=7355956"];

        if (message.mentions.members.first() != null) {
            let embed = new discord.MessageEmbed()
                .setDescription(`*${message.author.toString()} hits ${message.mentions.members.first().toString()} >:(*`)
                .setImage(`${array[Math.floor(Math.random() * array.length)]}`)
            message.channel.send(embed)
            message.delete();
        } else {
            let embed = new discord.MessageEmbed()
                .setDescription(`*hits ${message.author.toString()} >:(*`)
                .setImage(`${array[Math.floor(Math.random() * array.length)]}`)
            message.channel.send(embed)
            message.delete();
        }
    }
}