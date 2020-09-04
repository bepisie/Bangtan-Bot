const Discord = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: 'userinfo',
    description: 'Find out infomation about yourself or another user!',
    args: false,
    usage: '<user>',
    guildOnly: false,
    cooldown: 2,
    aliases: ['user', 'info'],
    accessibleBy: 'Everyone',
    category: 'Utility',
    guildOnly: false,
    run: async(client, message, args) => {
        let user;
        if (args[0]) {
            user = message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.find(m => m.id === args[0])
        } else {
            user = message.member;
        }

        var roles = "";
        
        user.roles.cache.forEach(function(value, key) {
            roles += value.name + ", ";
        })
    
        const userembed = new Discord.MessageEmbed()
            .setTitle(`${user.displayName.toString()}`)
            .setThumbnail(user.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024}))
            .setColor(user.displayHexColor === "#000000" ? "FFFFFF" : user.displayHexColor)
            .addField('Member information:', stripIndents`**> Display name:** ${user.displayName}
            **> Joined at:** ${user.joinedAt}
            **> Roles:** ${roles}
            **> Username:** ${user.user.username}
            **> Discord Tag:** ${user.user.tag}
            **> Created at:** ${user.user.createdAt}`)
            .setTimestamp()

            if (user.presence.activities[0]) {
                userembed.addField("Presence information:", stripIndents`**> Type:** ${user.presence.activities[0].type}
                **> State:** ${user.presence.activities[0].state === 'CUSTOM_STATUS' ? 'Custom Status' : user.presence.activities[0].state}
                **> URL:** ${user.presence.activities[0].url ? user.presence.activities[0].url : "No URL"}
                **> Started at:** ${user.presence.activities[0].createdAt}`)
            }

        message.channel.send(userembed)

    }
}