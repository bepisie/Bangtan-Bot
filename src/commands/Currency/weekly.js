const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'weekly',
    description: 'Gives you your weekly allowance',
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, PREFIX) => {
        money.lastUse(message.member.id)
        let user = message.member;

        money.getWeekly(user.id).then(time => {
            if (((Math.floor(Date.now() / 1000) - time) <= 604800)) {
                let seconds = 604800 - (Math.floor(Date.now() / 1000) - time);
                let countdown;
                if (seconds < 60) {
                    countdown = (`${seconds} more second(s)`);
                } else if (60 < seconds && seconds < 3600) {
                    countdown = (`${Math.floor(seconds / 60)}m and ${Math.floor(seconds % 60)}s`);
                } else if (seconds > 3600 && seconds < 86400) {
                    countdown = (`${Math.floor(seconds / 3600)}h, ${Math.floor((seconds % 3600) / 60)}m, and ${Math.floor((seconds % 3600) % 60)}s`);
                } else if (seconds > 86400) {
                    countdown = (`${Math.floor(seconds / 86400)}d, ${Math.floor((seconds % 86400) / 3600)}h, ${Math.floor(((seconds % 86400) % 3600) / 60)}m, and ${Math.floor(((seconds % 86400) % 3600) % 60)}s`);
                }
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Woah there!")
                    .setDescription(`You still have to wait ${countdown} before reusing ${PREFIX}weekly.`)
                })
                return;
            }

            money.getCash(user.id).then(bal => {
                money.weekly(message.member.id)
                money.addCash(message.member.id, 12000)
                money.getCash(message.member.id).then(balance => {
                    message.channel.send({
                        embed: new MessageEmbed()
                        .setColor("BLUE")
                        .setTitle(`${message.author.username}`)
                        .setDescription(`You got 12,000 ${bb.bb} for checking in this week!\nYour new balance is: ${(parseInt(bal) + 12000)} ${bb.bb}`)
                        .setTimestamp()
                    });
                })
            })
        })
    }
}
