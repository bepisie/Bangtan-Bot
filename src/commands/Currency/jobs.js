const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'jobs',
    description: 'See what jobs are availible.',
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, PREFIX) => {
        message.channel.send({
            embed: new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`Jobs!`)
            .setDescription(`Here are the jobs we currently have available:\n**Note:** Each job has a little minigame associated with it! Try them all and see what your favourite is.\n\n**Dance Instructor**\n**Vocal Coach**\n**Video Director**\n**Sound Designer (HARD)**\n**Stage Manager**\n\nType '${PREFIX}job [job you want]' to start working!`)
            .setFooter("Work")
            .setTimestamp()
        });
    }
}