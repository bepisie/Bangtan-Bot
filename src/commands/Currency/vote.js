const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'vote',
    description: `Vote to get 500 ${bb.bb}.`,
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, anChan, PREFIX) => {
        message.channel.send({
            embed: new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`Vote!`)
            .setDescription(`Vote for Bangtan Bot by clicking [here](https://top.gg/bot/718458821865111624/vote)\n\nYou will recieve 500 ${bb.bb} every time you vote :)`)
            .setTimestamp()
        });
    }
}