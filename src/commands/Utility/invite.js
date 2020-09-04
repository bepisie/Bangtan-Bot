const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'invite',
    description: 'Invite Bangtan Bot to your own server!!',
    args: false,
    usage: '',
    guildOnly: false,
    cooldown: 5,
    accessibleBy: 'Everyone',
    category: 'Utility',
    run: async(client, message, args) => {
        message.channel.send({
            embed: new MessageEmbed()
            .setTitle("Invite Bangtan Bot!")
            .addField("Invite link:", `[Click here](https://bit.ly/bangtanbot)`)
            .setThumbnail(client.user.displayAvatarURL())
        })
    }
}