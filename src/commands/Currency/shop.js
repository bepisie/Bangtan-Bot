const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const ms = require("ms")
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'shop',
    description: 'See what you can buy with your money!',
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 1,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, anChan, PREFIX) => {
        message.channel.send({
            embed: new MessageEmbed()
            .setColor("BLUE")
            .setTitle("Shop!")
            .setDescription(`To buy something, use \`?buy [item ID]\`\n\n**Games:**\n- Higher or Lower | 50k ${bb.bb}| Item ID: hilo\nGuess whether the number will be higher or lower, and win some serious cash!\n\n**Boosters:**\n- 3 day Rob Protection | 50k ${bb.bb} | Item ID: 3dayrob\nProtect yourself from being robbed for 3 days!\n- 7 day Rob Protection | 100k ${bb.bb} | Item ID: 7dayrob\nProtect yourself from being robbed for 7 days!\n- 30 day Rob Protection | 250k ${bb.bb} | Item ID: 30dayrob\nProtect yourself from being robbed for 30 days!\n`)
        })
    }
}