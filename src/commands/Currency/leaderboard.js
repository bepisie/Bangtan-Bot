const discord = require("discord.js")
const money = require("../../../database/sql")
const bb = require('../../bangtanbucks')

module.exports = {
    name: 'leaderboard',
    aliases: ["top", "leader"],
    description: 'See the top 5 members in your server.',
    args: false,
    usage: '',
    guildOnly: true,
    cooldown: 0,
    accessibleBy: 'Everyone',
    category: 'Currency',
    run: async(client, message, args, anChan, PREFIX) => {
        let guild = message.guild;
        let members = guild.members.cache;
        let top = [];
        let topid = new Map();
        let topplayers = [];
        let cut;
        let cut2;
        let i = [];

        members.forEach(member => {
            money.getCash(member.id).then(bal => {
                top.push((bal))
                topid.set((bal), member.id)

                var sort = top.sort(function(a, b){return b-a})
                cut = sort.slice(0, 5)
                i.push("t")
                if (i.length === member.guild.members.cache.size) {
                    cut.forEach(score => {
                        topplayers.push(topid.get(score))
                    })
                    cut2 = topplayers.slice(0, 5)

                    message.channel.send({
                        embed: new discord.MessageEmbed()
                        .setColor("BLUE")
                        .setTitle("Top users!")
                        .setDescription(`Server - **${member.guild.name}**\n\n**1 -** <@${cut2[0]}> - ${cut[0]} ${bb.bb}\n**2 -** <@${cut2[1]}> - ${cut[1]} ${bb.bb}\n**3 -** <@${cut2[2]}> - ${cut[2]} ${bb.bb}\n**4 -** <@${cut2[3]}> - ${cut[3]} ${bb.bb}\n**5 -** <@${cut2[4]}> - ${cut[4]} ${bb.bb}`)
                        .setFooter("Bangtan Bot")
                    })
                }
            }) 
        });
    }
}
