const { MessageEmbed } = require('discord.js');
var convert = require('convert-units')

module.exports = {
    name: 'convert',
    description: 'Convert one measurement to another! This command only supports shorthand measurements (eg miles = mi, kilometers = km).',
    args: true,
    usage: '[amount] [from (shorthand measurement)] [to (shorthand measurement)]',
    guildOnly: false,
    cooldown: 5,
    accessibleBy: 'Everyone',
    category: 'Utility',
    run: async(client, message, args, PREFIX) => {
        if (message.content.includes("c") || message.content.includes("f")) {
            args.find("c").replace("c", "C")
            args.find("f").replace("f", "F")
        }
        try {
            message.channel.send(`${args[0]} ${args[1]} is equal to ${convert(args[0]).from(args[1]).to(args[2])} ${args[2]}.`)
        } catch(err) {
            message.channel.send(`This measurement is unsupported, please use the shorthand measurement. (eg miles = mi, kilometers = km)`)
        }
    }
}