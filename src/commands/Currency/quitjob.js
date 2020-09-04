const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'quitjob',
    description: 'Quit your job.',
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Currency',
    aliases: ['quit'],
    run: async(client, message, args, PREFIX) => {
        let user = message.member;

        money.getJob(user.id).then(job => {
            if (job === 'none') {
                message.channel.send({
                    embed: new MessageEmbed()
                    .setDescription("You can't quit your job if you don't have one!")
                    .setColor("RED")
                })
            } else {
                money.removeJob(user.id)
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Quit Job")
                    .setDescription("You have successfully quit your job.")
                })
            }
        })
    }
}