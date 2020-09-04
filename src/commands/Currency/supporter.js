const { MessageEmbed } = require("discord.js")
const money = require("../../../database/sql")
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'supporter',
    description: 'Gives you daily money for being in Bangtan Bot\'s Support Server',
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, PREFIX) => {
        money.lastUse(message.member.id)
        let user = message.member;

        money.getSupport(user.id).then(time => {
            if (((Math.floor(Date.now() / 1000) - time) <= 86400)) {
                let seconds = 86400 - (Math.floor(Date.now() / 1000) - time);
                let countdown;
                if (seconds < 60) {
                    countdown = (`${seconds} more second(s)`);
                } else if (60 < seconds && seconds < 3600) {
                    countdown = (`${Math.floor(seconds / 60)}m and ${Math.floor(seconds % 60)}s`);
                } else if (seconds > 3600 && seconds < 86400) {
                    countdown = (`${Math.floor(seconds / 3600)}h, ${Math.floor((seconds % 3600) / 60)}m, and ${Math.floor((seconds % 3600) % 60)}s`);
                }
                message.channel.send({
                    embed: new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Woah there!")
                    .setDescription(`You still have to wait ${countdown} before reusing ${PREFIX}supporter.`)
                })
                return;
            }

            money.getCash(user.id).then(bal => {
                if (client.guilds.cache.get("728748967449460747").members.cache.has(user.id)) {
                    money.supporter(message.member.id)
                    money.addCash(message.member.id, 500)
                    money.getCash(message.member.id).then(balance => {
                        message.channel.send({
                            embed: new MessageEmbed()
                            .setColor("BLUE")
                            .setTitle(`${message.author.username}`)
                            .setDescription(`You got 500 ${bb.bb} for checking into our support server today.\nYour new balance is: ${(parseInt(bal) + 500)} ${bb.bb}`)
                            .setTimestamp()
                        });
                    })
                } else {
                    message.channel.send({
                        embed: new MessageEmbed()
                        .setColor("RED")
                        .setTitle(`Supporter.`)
                        .setDescription(`You need to be in Bangtan Bot's Support Server to claim this! You can join by [clicking here](https://discord.gg/Z8vEbPW).`)
                        .setTimestamp()
                    });
                }
            })
        })
    }
}
