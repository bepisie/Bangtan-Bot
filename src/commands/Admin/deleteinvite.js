const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'deleteinvite',
    description: 'Deletes a specified invite code',
    args: true,
    usage: '[invite code]',
    guildOnly: true,
    cooldown: 0,
    accessibleBy: 'Moderators',
    category: 'Admin',
    permRequirement: 'MANAGE_MESSAGES',
    run: async(client, message, args) => {

        let code = args[0];

        message.guild.fetchInvites().then(invites => {
            let invite = invites.find(i => i.code === code);
            if (!invite) return message.channel.send({
                embed: new MessageEmbed()
                .setColor("RED")
                .setDescription("Invalid invite code!")
            })
            invite.delete()
            message.channel.send({
                embed: new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Invite \`${code}\` has been successfully deleted!`)
            })
        })
    }
}