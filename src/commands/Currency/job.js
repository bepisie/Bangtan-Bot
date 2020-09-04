const { MessageEmbed, MessageAttachment } = require("discord.js")
const money = require("../../../database/sql")
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'job',
    description: 'Start a job.',
    args: true,
    usage: '[job you want]',
    guildOnly: false,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, PREFIX) => {
        let parts = message.content.split(" ");
        let job = parts.slice(1).join(" ");
        let user = message.member;

        money.getJob(user.id).then(job1 => {
            if (job1 !== 'none') return message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setTitle("Job!")
                .setDescription("You need to quit your current job (Using `?quit`) before starting a new one.")
            })

            if (job.toLowerCase() === 'dance instructor' || job.toLowerCase() === 'vocal coach' || job.toLowerCase() === 'video director' || job.toLowerCase() === 'sound designer' || job.toLowerCase() === 'stage manager') {
                money.addJob(user.id, job.toLowerCase())
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle(`Jobs!`)
                    .setDescription(`${user}\nJob assigned: ${job}\nUse ${PREFIX}work to start working.`)
                    .setFooter("Work")
                    .setTimestamp()
                });
            } else {
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle(`Jobs!`)
                    .setDescription(`This is not a valid job. Use ${PREFIX}jobs to get a list of all available jobs`)
                    .setFooter("Work")
                    .setTimestamp()
                });
            }
        })
    }
}